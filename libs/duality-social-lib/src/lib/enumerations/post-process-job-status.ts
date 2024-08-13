export const PostProcessJobStatuses = ['New', 'PendingDatabaseSave', 'PendingFirstResponse', 'PendingImageProcessing', 'Completed'] as const;
export type PostProcessJobStatus = typeof PostProcessJobStatuses[number];

export enum PostProcessJobStatusEnum {
    New = 'New',
    PendingDatabaseSave = 'PendingDatabaseSave',
    PendingFirstResponse = 'PendingFirstResponse',
    PendingImageProcessing = 'PendingImageProcessing',
    Complete = 'Completed',
}