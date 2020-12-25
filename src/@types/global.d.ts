interface Coordinates {
  x: number;
  y: number;
}

interface Letter extends EffectText {
  //   x: number;
  //   y: number;
  //   text: string;
  //   size: number;
  //   shadowColor: number;
  descendValue: number;
  seven: number;
}

interface EffectText {
  x: number;
  y: number;
  text: string;
  size: number;
  shadowColor: number;
}

interface EffectRectangle {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

type Create = {
  ID?: number;
  CreatedAt?: string;
  UpdatedAt?: string;
  DeletedAt?: string;
};

type User = Create & {
  username: string;
  password: string;
  passwordConfirm?: string;
  email?: string;
};

type Tag = Create & {
  Name: string;
  CreatedBy: string;
  UpdatedBy: string;
  Articles?: Article[];
};

type Article = Create & {
  createdBy: string;
  updatedBy: string;
  title: string;
  description: string;
  coverImageURL: string;
  content: string;
  tags?: Tag[];
};
interface ResponseData<T> {
  code: number;
  data: T;
  message: string;
}

interface AuthData {
  token: string;
}
interface UserData {
  users: User[];
  total: number;
}
interface TagData {
  tags: Tag[];
  total: number;
}

interface ArticleData {
  articles: Article[];
  total: number;
}