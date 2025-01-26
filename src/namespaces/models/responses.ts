export type ServerSuccessResponse<T> = {
  [key in
    | "post"
    | "pride"
    | "user"
    | "news"
    | "categories"
    | "category"
    | "users"
    | "prides"
    | "gallery"
    | "galleries"]?: T;
} & {
  total?: number;
  success: true;
  message: string;
};
