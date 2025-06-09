export interface BlogPost {
    id: string;
    author: string;
    tags: string[];
    title: string;
    description: string;
    images: string[]; 
    pubDate: string;
    popular: boolean;
}
