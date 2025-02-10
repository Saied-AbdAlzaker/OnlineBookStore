export interface HomeDetails {
  _id: string;
  name: string;
  description: string;
  author: string;
  price: number;
  image: string;
  category: string;
  status: string;
  updatedAt: Date;
  createdAt: Date;
}
export interface CategoryDetails {
  _id: string;
  title: string;
  status: string;
  books: HomeDetails;
}
