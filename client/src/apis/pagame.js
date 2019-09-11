import axios from 'axios'
export default axios.create({
    baseURL: 'http://pagame.kbvapps.com:3000/',
    headers: {
        'Content-Type': 'application/json'
    }
});