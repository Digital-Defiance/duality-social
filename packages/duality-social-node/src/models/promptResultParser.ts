import {
    OpenAIGenerationResult,
  } from './openAiGenerationResult';
  import { CreateCompletionResponseChoicesInner } from 'openai';
  
  export function promptResultParser(
    choices: CreateCompletionResponseChoicesInner[],
    postId?: string
  ): OpenAIGenerationResult {
    if (!choices || choices.length == 0 || !choices[0].text) {
      throw new Error('Empty choices', { cause: choices });
    }
  
    const promptResult: OpenAIGenerationResult = new OpenAIGenerationResult({
        aiResponse: choices[0].text,
        postId: postId,
    });
    return promptResult;
  }
  