import { ContentCreator } from '@/modules/creator/types';

export enum ContentType {
  Video = 'Video',
  Photo = 'Photo',
}

export interface Content {
  id: string;
  type: ContentType;
  creator: ContentCreator;
}

export interface PaginatedContents {
  results: Array<Content>;
  meta: {
    total: number;
    page: number;
    pages: number;
  }
}
