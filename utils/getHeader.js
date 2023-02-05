import { USER_DATA_KEY } from "./constants";
import { getCookie } from "cookies-next";

const getHeader = (multipart) => {
    if (typeof window !== "undefined") {
        const userData = getCookie(USER_DATA_KEY);
        if (userData) {
            const userInfo = JSON.parse(userData)
            const token = userInfo?.token

            return {
                headers: multipart ? {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                } : {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            }
        }
    }

}


export default getHeader