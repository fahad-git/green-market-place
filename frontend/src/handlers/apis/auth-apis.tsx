import axios from "axios";


const loginUser = async (credentials: object) => {
    const res: any = {}
    res.status = 200;
    res.data =  await {
        name: "User1",
        email: "user@gmail.com",
        accessToken: "Token",
        refreshToken: "Token",
    }

   await waitforme(2000);
    return res;
    // return await axios.post(`{process.env.SERVER_URL}/login`, credentials);
}

function waitforme(millisec: any) {
    return new Promise(resolve => {
        setTimeout(() => { resolve('') }, millisec);
    })
}

const APIs = {
    loginUser
}

export default APIs;