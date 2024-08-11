export interface ContentCreatorLink {}

export interface ContentCreator {
  name: string;
  id: string;
  links: Array<ContentCreatorLink>;
}

export interface PaginatedContentCreators {
  results: Array<ContentCreator>;
  meta: {
    total: number;
    page: number;
    pages: number;
  }
}
