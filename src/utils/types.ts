export enum AUTHOR_ENUM {
    CHATBOT = "chatbot",
    USER = "user"
}

export interface IMessage {
    author: AUTHOR_ENUM;
    date: string;
    list?: string[];
    options?: string[];
    coffees?: ICoffee[];
    name?: string;
    message: string;
    status: "typing" | undefined;
    suggest?: boolean;
}

export enum SIZE_ENUM {
    TALL = "tall",
    GRANDE = "grande",
    VENTI = "venti"
}

export interface ICoffee {
    size: SIZE_ENUM;
    count: number;
    coffee: string
}

export interface Dict<T = {}> {
    [key: string]: T;
}