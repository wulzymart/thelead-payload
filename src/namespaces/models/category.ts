export class CategoryResp {
  id!: number;
  name!: string;
  slug!: string;
  __subcategories__!: Subcategory[];
}
export class Category {
  id!: number;
  name!: string;
  slug!: string;
  subcategories!: Subcategory[];
}

export class Subcategory {
  id!: number;
  name!: string;
  slug!: string;
}
