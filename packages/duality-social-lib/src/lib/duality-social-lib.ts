import {
  CreateImageRequestSizeEnum,
} from 'openai';
import { Buffer } from 'buffer';

  /**
   * Makes a data:// URL from a base64 encoded binary blob string containing a PNG image
   * @param imageBase64Json String containing b64_json
   */
  export function makeDataUrl(imageBase64Json: string): string {
    return `data:image/png;base64,${imageBase64Json}`;
  }

  export function closestImageSize(size: number): CreateImageRequestSizeEnum {
    // If size is greater than or equal to 1024, return 1024
    // If size is greater than or equal to 768, return 1024 (round up)
    // If size is greater than or equal to 512, return 512
    // If size is greater than or equal to 256, return 512 (round up)
    // If size is less than or equal to 384, return 256
    if (size >= 1024 || (size >= 768 && size < 1024)) {
      return CreateImageRequestSizeEnum._1024x1024;
    } else if (size >= 512 || (size >= 256 && size < 512)) {
      return CreateImageRequestSizeEnum._512x512;
    }
    return CreateImageRequestSizeEnum._256x256;
  }

export function imageDataUrlToFile(imageDataUrl: string): File
{
  if (!imageDataUrl.startsWith('data:image/png;base64,')) {
    throw new Error('Invalid image data URL');
  }
  const imageData = Buffer.from(imageDataUrl.split(',', 2)[1]);
  const imageFile = new File([imageData], 'image.png');
  return imageFile;
}

export function parseFontAwesome(input: string): string {
  // look for [:fa-anything fa-blah:] and [:fa-blah:]
  /* if only one 'fa-'term is specified, assume fa-regular
    * [:fa-person:] -> <i class="fa-regular fa-person"></i>
  /* if two 'fa-'terms are specified, assume the first is the style
    * and the second is the icon
    * [:fa-solid fa-person:] -> <i class="fa-solid fa-person"></i>
    */
   const oneTermRegex = /\[:fa-([a-zA-Z0-9-]+):\]/g;
   const twoTermRegex = /\[:fa-([a-zA-Z0-9-]+)(?: fa-([a-zA-Z0-9-]+))?:\]/g;
  
    let changed = false;
    do {
      const before = input;
      // Replace [:fa-X:] with <i class="fa-regular fa-X"></i>
      input = input.replace(oneTermRegex, '<i class="fa-regular fa-$1"></i>');
      
      // Replace [:fa-X fa-Y:] with <i class="fa-X fa-Y"></i>
      input = input.replace(twoTermRegex, '<i class="fa-$1 fa-$2"></i>');
      changed = before !== input;
    } while (changed);

    return input;
}