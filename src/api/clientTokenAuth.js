import {create} from "apisauce";

const apiClientWithToken = (token) => create(
    {
        baseURL: "http://fakestoreapi.com",
        headers:{
            Authorization: "Bearer " + token
        }
    }
);

export default apiClientWithToken