import axios from 'axios';

const API = axios.create({
    baseURL: 'https://app.bilanciaweb.it'
});

export default API;
