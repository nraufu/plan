import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://planit-3ab74.firebaseio.com/'
})

export default instance;