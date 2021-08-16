import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://improved-burgerbuilder-default-rtdb.firebaseio.com/'
})

export default instance;