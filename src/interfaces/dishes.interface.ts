export interface IDish {
    id: string;
    name: string;
    description: string;
    stock: boolean;
    price: string;
    imgUrl?: File | null;
}

export interface SoftDish {
    name: string;
    description?: string;
    price: string;
}