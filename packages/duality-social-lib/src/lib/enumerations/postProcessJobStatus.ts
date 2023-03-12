export const PostProcessJobStatuses = ['New', 'PendingDatabaseSave', 'PendingFirstResponse', 'PendingImageProcessing', 'Completed'] as const;
export type PostProcessJobStatus = typeof PostProcessJobStatuses[number];

export const enum PostProcessJobStatusEnum {
    New = 'New',
    PendingDatabaseSave = 'PendingDatabaseSave',
    PendingFirstResponse = 'PendingFirstResponse',
    PendingImageProcessing = 'PendingImageProcessing',
    Complete = 'Completed',
}