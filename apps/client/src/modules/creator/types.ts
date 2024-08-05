export interface ContentCreatorLink {}

export interface ContentCreator {
  name: string;
  id: string;
  links: Array<ContentCreatorLink>;
}
