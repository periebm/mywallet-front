import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

function login(body){
    const promise = axios.post(`${BASE_URL}/login`, body);
    return promise;
}

function signUp(body){
    const promise = axios.post(`${BASE_URL}/sign-up`, body);
    return promise;
}

const apiAuth = {login, signUp};
export default apiAuth;