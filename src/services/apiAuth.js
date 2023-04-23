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

function transaction(auth) {
    const promise = axios.get(`${BASE_URL}/transaction`, auth)
    return promise;
}

const apiAuth = {login, signUp, transaction};
export default apiAuth;