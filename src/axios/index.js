import axios from 'axios';

const ax = axios.create({
    baseURL: 'http://localhost:8001/api/',
    headers: {
        "Content-Type": "application/json;charset=utf-8/multipart/form-data",
        
    }
});

//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded/multipart/form-data';

ax.interceptors.request.use(function (config) {
    // Do something before request is sent
    const token = localStorage.getItem('token');

    if (token) {
        config.headers.common['Authorization'] = `Bearer ${token}`;

    }

    return config;
}, function (error) {
    // Do something with request eror
    return Promise.reject(error);
});

export default ax;
