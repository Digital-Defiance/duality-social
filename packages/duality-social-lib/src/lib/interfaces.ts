export interface IProfile {
    givenName?: string;
    surname?: string;
    userPrincipalName?: string;
    id?: string;
  };

  /**
   * Request body for the devils advocate endpoint
   */
  export interface IDevilsAdvocateRequest {
    postText: string;
    postId: string;
    userId: string;
    images: string[];
  }

  /**
   * Response body for the devils advocate endpoint
   */
  export interface IDevilsAdvocateResponse {
    postId: string;
    aiPostText: string;
    images: string[];
  }