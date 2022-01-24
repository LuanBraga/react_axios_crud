import axios from "axios";

//this initializes Axios with HTTP base url and headers
export default axios.create({
    baseURL: 'http://localhost:8082/api',
    headers: {
        'Content-type': 'application/json'
    }
});