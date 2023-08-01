import axios from 'axios';

const $axios = axios.create({
    baseURL: 'http://localhost:3333/',
    headers: {
        'Accept': 'application/json',
    }
});


export default $axios;