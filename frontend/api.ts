import Constants from 'expo-constants';

const api = axios.create({
    baseUrl: Constants.expoConfig?.extra?.API_URL || 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    },
});