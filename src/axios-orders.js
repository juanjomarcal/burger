import axios from 'axios';

const instance = axios.create({
  // baseURL: 'https://burguer-f099e.firebaseio.com/'
  baseURL: 'http://localhost:3001/'
})

export default instance;
