export interface Product{
    category: Category;
    creationAt: Date | string;
    description: string;
    id: number;
    images: string[];
    price:number;
    slug:string;
    title:string;
    updatedAt: Date| string;
}
export interface Category{
    creationAt: Date|string;
    id:number;
    image:string;
    name: string;
    slug:string;
    updatedAt: Date|string;
}
