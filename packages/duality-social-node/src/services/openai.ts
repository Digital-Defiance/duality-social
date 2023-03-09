
import {
  closestImageSize,
  HumanityType,
  imageDataUrlToFile,
  IPost,
  IPostViewpoint,
  makeDataUrl,
  PostViewpoint
} from '@digital-defiance/duality-social-lib';
import {
    Configuration,
    CreateCompletionRequest,
    CreateImageRequestResponseFormatEnum,
    ConfigurationParameters,
    OpenAIApi,
    CreateImageRequestSizeEnum,
  } from 'openai';
  import {
    OpenAIGenerationResult,
  } from '../models/openAiGenerationResult';
import { promptResultParser } from '../models/promptResultParser';
import { decode, encode } from 'fast-png';
import { ImageData } from 'fast-png/lib/types';
import { environment } from '../environment';
import { model, Model, Schema } from "mongoose";
import { Post, postSchema, postViewpointSchema } from '@digital-defiance/duality-social-lib'
export const DevilsAdvocatePrompt = "Given the following post by a human, rewrite it, taking an opposite position, like playing Devil's Advocate, using a similar tone and style:";
export const DevilsAdvocateImagePrompt = "Given the following position text, and a supplied image, generate an image that depicts the position:";

const openAiConfig: ConfigurationParameters = {
  basePath: environment.openai.type === 'azure' ? 'https://api.openai.com/v1' : 'https://api.openai.com/v1',
  accessToken: environment.openai.accessToken,
  organization: environment.openai.organization
};
const openAiClient = getOpenAIClient(openAiConfig);

export async function createMaskPngDataUrl(size: number): Promise<string>
{
  const channelCount = 4;
  const rawData = new Uint8ClampedArray(size * size * channelCount);
  for (let i = 0; i < rawData.length; i++) {
    rawData[i] = 0;
  }
  const imageData: ImageData = {
    width: size,
    height: size,
    depth: 8,
    channels: channelCount,
    data: rawData,
  };
  const encoded = Buffer.from(encode(imageData));
  return makeDataUrl(encoded.toString('base64'));
}

export async function getImageSizeFromImageDataUrl(imageDataUrl: string): Promise<CreateImageRequestSizeEnum>
{
    try {
      const imageData = Buffer.from(imageDataUrl.split(',', 2)[1], 'base64');
      const png = decode(imageData);
      const largestDimension = Math.max(png.width, png.height);
      if (largestDimension === 0) {
        return Promise.reject('Invalid image data URL');
      }
      return closestImageSize(largestDimension);
    }
    catch (
      error
    ) {
      return Promise.reject(error);
    }
}

export function createImageRequestSizeEnumToNumber(size: CreateImageRequestSizeEnum): number
{
  switch (size) {
    case CreateImageRequestSizeEnum._256x256:
      return 256;
    case CreateImageRequestSizeEnum._512x512:
      return 512;
    case CreateImageRequestSizeEnum._1024x1024:
      return 1024;
    default:
      throw new Error(`Invalid size: ${size}`);
  }
}

export async function imageDataUrlToSizeAndFile(imageDataUrl: string): Promise<{ size: CreateImageRequestSizeEnum, file: File }>
{
  return {
    size: await getImageSizeFromImageDataUrl(imageDataUrl),
    file: imageDataUrlToFile(imageDataUrl),
  };
}

  /**
   * Returns a configured OpenAI API client.
   * @returns
   */
  export function getOpenAIClient(
    configurationParameters: ConfigurationParameters
  ): OpenAIApi {
    return new OpenAIApi(new Configuration(configurationParameters));
  }
  
  /**
   * Does the openAI thingy
   * @param response Response express;
   */
  export async function getOppositeResponseFromOpenAI(
    post: string,
    postId: Schema.Types.ObjectId,
    userId?: Schema.Types.ObjectId
  ): Promise<OpenAIGenerationResult> {
    const model = 'gpt-3.5-turbo';
    const maxTokens = 1000;
    const temperature = 0.9;
    // const topP = 1;
    const presencePenalty = 2;
    const frequencyPenalty = 2;
    const bestOf = 1;
    const n = 1;
    const stream = false;
    // const stop = ["\n"];
    // const logprobs = null;
    // const echo = false;
    // const logitBias = null;
    const completionRequest: CreateCompletionRequest = {
      model: model,
      prompt: DevilsAdvocatePrompt.concat("\n\n", post),
      max_tokens: maxTokens,
      temperature,
      // top_p: topP,
      presence_penalty: presencePenalty,
      frequency_penalty: frequencyPenalty,
      best_of: bestOf,
      n,
      stream,
      // stop,
      // logprobs,
      // echo,
      // logit_bias: logitBias,
    };
    if (userId) {
      completionRequest.user = userId.toString();
    }
    const openaiResponse = await openAiClient.createCompletion(completionRequest, {
      headers: {
        'Authorization': 'Bearer ' + environment.openai.accessToken,
        'Content-Type': 'application/json',
      },
    });
    if (openaiResponse.data?.choices) {
      try {
        return promptResultParser(openaiResponse.data.choices, postId);
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(
      new Error('Unexpected response from OpenAI', { cause: openaiResponse })
    );
  }
  
  /**
   * Given a prompt, generate an image using DALL-E
   * TODO: add retry logic for 429 errors
   * @param prompt The prompt to use
   * @returns The image data
   */
  export async function generateDallEImage(
    prompt: string,
    sourceImageDataUrl: string,
    userId?: Schema.Types.ObjectId,
  ): Promise<string> {
    const sourceSizeEnum = await getImageSizeFromImageDataUrl(sourceImageDataUrl);
    const sourceSize = createImageRequestSizeEnumToNumber(sourceSizeEnum);
    const maskData = await createMaskPngDataUrl(sourceSize);
    const maskFile = imageDataUrlToFile(maskData);
    const sizeFileObject = await imageDataUrlToSizeAndFile(sourceImageDataUrl);
    const generatedImage = await openAiClient.createImageEdit(
      sizeFileObject.file,
      prompt,
      maskFile,
      1, // generate 1 image
      sizeFileObject.size,
      CreateImageRequestResponseFormatEnum.B64Json, // return base64 encoded json
      userId?.toString()
    );
    if (generatedImage.data?.data) {
      const imageBase64Json: string | null =
        generatedImage.data?.data[0].b64_json ?? null;
      if (!imageBase64Json) {
        // console.error("Unexpected response from OpenAI", generatedImage.data);
        return Promise.reject(
          new Error('Unexpected response from OpenAI', {
            cause: [generatedImage, generatedImage.data.data],
          })
        );
      }
      return makeDataUrl(imageBase64Json);
    }
    // console.error("Unexpected response from OpenAI", generatedImage.data);
    return Promise.reject(
      new Error('Unexpected response from OpenAI', {
        cause: [generatedImage, generatedImage.data?.data],
      })
    );
  }

   async function runPrompt(createdById: Schema.Types.ObjectId, humanity: HumanityType, postContent: string): Promise<Post> {
    // todo start spinner? deal with outside this?
    const post = new Post();
    post.createdById = createdById;
    const savedPost = await post.toPostModel().save();
    const postId: Schema.Types.ObjectId | undefined = savedPost._id;
    if (!postId) {
      throw new Error('Post id not saved');
    }
    post._id = postId;
    const firstViewpoint = new PostViewpoint({
      postId: postId,
      humanityType: humanity,
      content: postContent,
      createdById: createdById,
    } as IPostViewpoint);
    const firstViewpointModel = firstViewpoint.toPostModel();
    const firstViewpointId = (await firstViewpointModel.save())._id;
    if (!firstViewpointId) {
      throw new Error('First viewpoint id not saved');
    }
    const aiResponse = await getOppositeResponseFromOpenAI(postContent, postId, createdById);
    if ((aiResponse).postId !== postId) {
      throw new Error('Post id mismatch');
    }
    post.inputViewpointId = firstViewpointId;
    // TODO: images
    const aiViewpoint = new PostViewpoint({
      postId: postId,
      humanityType: HumanityType.AI,
      content: aiResponse.aiResponse,
      createdById: createdById,
    } as IPostViewpoint);
    const aiViewpointModel = aiViewpoint.toPostModel();
    const aiViewpointId = (await aiViewpointModel.save())._id;
    if (!aiViewpointId) {
      throw new Error('AI viewpoint id not saved');
    }
    post.aiViewpointId = aiViewpointId;
    const postModel = post.toPostModel();
    const postResult = await postModel.save();
    if (!postResult._id) {
      throw new Error('Post not saved');
    }
    return new Post(postResult.toObject());
  }