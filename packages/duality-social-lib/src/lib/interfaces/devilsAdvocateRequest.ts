  /**
   * Request body for the devils advocate endpoint
   */
  export interface IDevilsAdvocateRequest {
    postText: string;
    postId: string;
    userId: string;
    images: string[];
  }