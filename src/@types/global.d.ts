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

type BaseProperty = {
    id?: number;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
};

type User = BaseProperty & {
    username: string;
    password: string;
    passwordConfirm?: string;
    email?: string;
};

type Tag = BaseProperty & {
    name: string;
    createdBy: string;
    updatedBy: string;
    articles?: Article[];
};

type Article = BaseProperty & {
    createdBy: string;
    updatedBy: string;
    title: string;
    description: string;
    coverImageURL: string;
    content: string;
    tags?: Tag[];
    tagNames?: string;
};
interface ResponseData<T> {
    code: number;
    data: T;
    message: string;
}

interface AuthData {
    token: string;
    permissions?: string;
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
