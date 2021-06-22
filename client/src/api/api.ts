import axios from 'axios';

export const axiosAPI = axios.create({
    baseURL: 'http://localhost:5000/api/',
});

export const IMAGE_PATH_PREFIX = 'http://localhost:5000/images';
