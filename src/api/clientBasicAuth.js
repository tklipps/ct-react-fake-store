import {create} from "apisauce";
import base64 from "base-64";

const apiClient = (username, password) => create(
    {
        baseURL: "https://fakestoreapi.com",
        headers:{
            Authorization: "Basic " +base64.encode(username+":"+password)
        }
    }
);

export default apiClient