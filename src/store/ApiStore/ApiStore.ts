import axios, { AxiosResponse } from "axios";

async function getItems<T>(endpoint: string) {
    const response: AxiosResponse<T> = await axios.get(endpoint);
    return response;
} 

export default getItems