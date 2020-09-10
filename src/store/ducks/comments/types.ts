/**
 * Action Types
 */
export enum CommentsTypes {
  CREATE_COMMENT = '@comments/CREATE_COMMENT',
  EDIT_COMMENT = '@comments/EDIT_COMMENT',
  DELETE_COMMENT = '@comments/DELETE_COMMENT',
}

/**
 * Data Types
 */
export interface IComment {
  id: string;
  parentId: string;
  created_at: Date;
  body: string;
  author: string;
  deleted: boolean;
}

/**
 * State type
 */
export interface CommentsState {
  readonly data: IComment[];
}
