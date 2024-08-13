import {
    OpenAIGenerationResult,
  } from './open-ai-generation-result';
  import { CreateCompletionResponseChoicesInner } from 'openai';
import { Schema } from 'mongoose';
  
  export function promptResultParser(
    choices: CreateCompletionResponseChoicesInner[],
    postId?: Schema.Types.ObjectId
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
  