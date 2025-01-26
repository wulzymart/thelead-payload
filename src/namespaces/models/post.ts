import { Subcategory } from "./category";

export class PostDTO {
  title!: string;
  featuredImage?: string;
  isExclusive?: boolean;
  isBreaking?: boolean;
  isHeadline?: boolean;
  isMajorHeadline?: boolean;
  description?: string;
  excerpt?: string;
  content!: string;
  categoryId!: number;
  subcategories!: Subcategory[];
  subcategoryId!: number | null;
  isPublished: boolean = false;
}

export class Post extends PostDTO {
  id!: string;
  slug!: string;
  createdAt!: Date;

}
