export interface Tag {
  id: string;
  name: string;
}

export interface PaginatedTag {
  results: Array<Tag>;
  meta: {
    total: number;
    page: number;
    pages: number;
  }
}
