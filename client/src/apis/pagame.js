import axios from 'axios'
//3001 port for json-server 
//3000 port for NodeJS server with MongoDB atlas
export default axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json'
    }
})