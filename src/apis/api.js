import axios from 'axios';
import store from "../store/store";

let hostname = 'localhost';
let port = 5000;

let baseDomain = process.env.NODE_ENV === 'production' ? window.location.host : `${hostname}:${port}`;
let baseURL = `http://${baseDomain}/api`;

export default axios.create({
    baseURL
})
