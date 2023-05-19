export type GoogleSearchResult = {
  title: string;
  link: string;
  snippet: string;
  pagemap: Pagemap;
}[];

export type Pagemap = {
  cse_image?: {
    src: string;
  }[];
  cse_thumbnail?: {
    src: string;
    width: string;
    height: string;
  }[];
  metatags?: {
    [key: string]: any;
  }[];
};
