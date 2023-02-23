
import {
  createMaskPngDataUrl,
  imageDataUrlToSizeAndFile,
  makeDataUrl
} from '@digital-defiance/duality-social-lib';
import {
    Configuration,
    CreateCompletionRequest,
    CreateImageRequestResponseFormatEnum,
    ConfigurationParameters,
    OpenAIApi,
  } from 'openai';
  import {
    OpenAIGenerationResult,
  } from '../models/openAiGenerationResult';
import { promptResultParser } from '../models/promptResultParser';
  
export const DevilsAdvocatePrompt = "Given the following post by a human, write a response that takes an opposite position, like playing Devil's Advocate, using a similar tone and style:"
export const DevilsAdvocateImagePrompt = "Given the following position text, and a supplied image, generate an image that depicts the position:"

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
    configurationParameters: ConfigurationParameters,
    post: string,
    postId: string,
    userId?: string
  ): Promise<OpenAIGenerationResult> {
    const openai = getOpenAIClient(configurationParameters);
    const model = 'text-davinci-003';
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
      prompt: DevilsAdvocatePrompt + "\n\n" + post,
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
      completionRequest.user = userId;
    }
    const openaiResponse = await openai.createCompletion(completionRequest);
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
    configurationParameters: ConfigurationParameters,
    prompt: string,
    sourceImageDataUrl: string,
    userId?: string,
  ): Promise<string> {
    const openai = getOpenAIClient(configurationParameters);
    const maskData = createMaskPngDataUrl(256, false, true);
    const maskArrayBuffer: ArrayBuffer = Buffer.from(maskData);
    const maskFile = new File([maskArrayBuffer], 'mask.png');
    const sizeFileObject = imageDataUrlToSizeAndFile(sourceImageDataUrl);
    const generatedImage = await openai.createImageEdit(
      sizeFileObject.file,
      maskFile,
      prompt,
      1, // generate 1 image
      sizeFileObject.size,
      CreateImageRequestResponseFormatEnum.B64Json, // return base64 encoded json
      userId
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