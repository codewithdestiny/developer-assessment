import axios from "axios";
import { env } from "process";

const axiosInstance = async (axiosMethod: string, param : Object | string) => {
    axios({
        method: axiosMethod,
        baseURL: `${env.OMDB_API_URL}/`,
        params: param
    })
    .then( response => {
        return response.data
    })
    .catch(err => {
        return err
    })

    
}

export default axiosInstance;