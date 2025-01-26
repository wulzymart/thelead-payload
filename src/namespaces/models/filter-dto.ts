export class FilterDTO {
  skip?: number;
  take?: number;
  sort?: [string, string][];

  isPublished?: boolean;
  options?: [string, boolean | number][];

  fields?: string;
}
