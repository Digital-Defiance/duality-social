import { Document, ObjectId } from 'mongoose';
import { IEmailToken } from '../interfaces/email-token';

/**
 * Composite interface for email token collection documents
 */
export interface IEmailTokenDocument extends IEmailToken, Document<ObjectId, any, any> {};