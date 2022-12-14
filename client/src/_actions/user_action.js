import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from './types';

axios.defaults.withCredentials = true;

export function loginUser(dataToSubmit) {

    const request = axios.post('https://nodeshim.run.goorm.io/api/users/login', dataToSubmit)
        .then(response => response.data)

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function registerUser(dataToSubmit) {

    const request = axios.post('https://nodeshim.run.goorm.io/api/users/register', dataToSubmit)
        .then(response => response.data)

    return {
        type: REGISTER_USER,
        payload: request
    }
}



export function auth() {

    const request = axios.get('https://nodeshim.run.goorm.io/api/users/auth')
        .then(response => response.data)

    return {
        type: AUTH_USER,
        payload: request
    }
}






