import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burguer-f099e.firebaseio.com/'
})

export default instance;
