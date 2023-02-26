export interface IPost {
    _id: string;
    parentId: string | null;
    text: string;
    aiText: string;
    imageIds: string[];
    createdAt: number;
    createdById: string;
}