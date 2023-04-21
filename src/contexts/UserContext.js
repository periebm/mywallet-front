import {createContext} from "react"

export const UserContext = createContext()
export const lsUser = JSON.parse(localStorage.getItem("user"));

export function checkLoggedIn(ls, user){
    if((ls === null || ls === undefined) && (user.token === null || user.token === undefined)){
        return false;
    }
    return true;
}