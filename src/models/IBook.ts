export interface IBook {
  id?: number;
  isbn: string;
  title: string;
  cover: string;
  author: string;
  published: number;
  pages?: number;
}

export interface AllBooks {
  data: {
    book: IBook;
    status: number;
  }[];
}

export interface ISearchedBooks {
  data: IBook[];
}

export interface ICreateBook {
  isbn: string;
}
