"use client"
import axios from "axios";
import { IStateUser } from "../redux/interfaces";

const loginUser = async (credentials: object) => {
    return await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`, credentials, {
        headers: { 'Content-Type': 'application/json' }
    });
}

const registerUser = async (user: any) => {
    return await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/register`, user, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
}

const APIs = {
    loginUser,
    registerUser
}

export default APIs;