import axios from 'react-native-axios';

const http = axios.create({
  baseURL: 'https://amg-app-v1.herokuapp.com/api',
  timeout: 5000,
  headers: {
    Accept: 'application/json',
  }
});

export default http;