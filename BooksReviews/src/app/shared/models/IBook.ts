export interface IBook {
  _id: string;
  title: string;
  content: string;
  genre: string;
  image: string;
  creator: string;
  comments: Array<string>
}
