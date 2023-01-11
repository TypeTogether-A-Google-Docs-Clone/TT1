import dayjs from 'dayjs';
import { IUser } from 'app/shared/model/user.model';

export interface IDocument {
  id?: number;
  documentTitle?: string;
  documentContent?: string | null;
  createdDate?: string | null;
  modifiedDate?: string | null;
  user?: IUser | null;
}

export const defaultValue: Readonly<IDocument> = {};
