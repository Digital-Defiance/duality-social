export interface IVote {
    _id: string;
    postId: string;
    human: boolean;
    createdAt: number;
    createdById: string;
}