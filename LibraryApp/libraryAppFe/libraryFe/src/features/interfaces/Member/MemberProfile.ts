export interface IMemberData {
  id: number;
  code: string;
  name: string;
  email: string;
  borrows: {
    id: number;
    borrowDate: string;
    book: {
      id: number;
      code: string;
      title: string;
      author: string;
      image: string;
    };
  }[];
}
