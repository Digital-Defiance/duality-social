export enum PostProcessJobStatus {
    New = 'New',
    PendingDatabaseSave = 'PendingDatabaseSave',
    PendingFirstResponse = 'PendingFirstResponse',
    PendingImageProcessing = 'PendingImageProcessing',
    Complete = 'Completed',
}