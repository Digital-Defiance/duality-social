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

  export interface IUser {
    _id: string;
    givenName: string;
    surname: string;
    userPrincipalName: string;
    canLogin: boolean;
    createdAt: number;
    updatedAt: number;
  }

  export interface IAdminUser extends IUser {
    isAdmin: boolean;
  }

  export interface IPost {
    _id: string;
    parentId: string | null;
    text: string;
    aiText: string;
    imageIds: string[];
    createdAt: number;
    createdById: string;
}

export interface IVote {
    _id: string;
    postId: string;
    human: boolean;
    createdAt: number;
    createdById: string;
}