import apiClient from "./clientBasicAuth";

const endpoint = "/auth/login";

const getToken = async (username, password)=>{
    let response = await apiClient(username,password).get(endpoint)
    let error, token = "eyJhbGciOiJIUzI1NiIsInR"
    if (response.status === 401){error = "Invalid Username/Password combo"}
    if (!response.ok){error = "Unexpected error - please try again"}
    if (response.ok){token = 'eyJhbGciOiJIUzI1NiIsInR'}
    return {"error":error, token}
};

export default getToken;