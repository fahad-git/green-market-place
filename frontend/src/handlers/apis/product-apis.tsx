"use client"
import axios from "axios";

const getProducts = async () => {
    return await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products`, {
        headers: { 'Content-Type': 'application/json' }
    });
}

const getProduct = async (productId: string) => {
    return await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/${productId}`, {
        headers: { 'Content-Type': 'application/json' }
    });
}

const addProduct = async (product: any) => {
    return await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/product/add`, product, {
        headers: { 'Content-Type': 'application/json' }
    });
}

const updateProduct = async (productId: string, product: any) => {
    return await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/product/${productId}`, product, {
        headers: { 'Content-Type': 'application/json' }
    });
}

const deleteProduct = async (ProductId: string) => {
    return await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/${ProductId}`, {
        headers: { 'Content-Type': 'application/json' }
    });
}

const PRODUCT_APIs = {
    getProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct
}

export default PRODUCT_APIs;