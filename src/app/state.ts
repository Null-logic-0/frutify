import { atom } from "recoil";
import { Product } from "./type";



export const productListState = atom<Product[]>({
    key: 'productListState',
    default: []
});


export const formState = atom({
    key: 'formState',
    default: {
        name: '',
        price: '',
        sale: '',
        description: '',
        image: null as File | null,
    },
});