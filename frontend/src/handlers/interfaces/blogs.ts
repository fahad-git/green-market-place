export interface IBlog {
    id: string;
    title: string;
    author: string;
    imageFile: File;
    imageUrl: string
    publishedDate: string;
    updatedDate: string;
    content: string;
}

export interface IBlogRequest {
    id: string;
    title: string;
    author: string;
    imageFile: File;
    content: string;
    userId: string
}

export interface IBlogResponse {
    id: string;
    title: string;
    author: string;
    imageFile: File;
    imageUrl: string
    publishedDate: string;
    updatedDate: string;
    content: string;
}
