import axios from 'axios';
import configService from './config';

const platziMusicService = axios.create({
    baseURL: configService.apiUrl,
    timeout: 50000,
    headers: {'X-Custom-Header': 'foobar'},
  });

  export default platziMusicService;