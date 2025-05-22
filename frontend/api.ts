import Constants from 'expo-constants';
import axios from 'axios';

const api = axios.create({
    baseURL: Constants.expoConfig?.extra?.API_URL || 'http://192.168.100.9:5050',
    headers: {
        'Content-Type': 'application/json',
    },
});