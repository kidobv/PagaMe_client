import axios from 'axios'
//3001 port for json-server 
//3030 port for MongoDB at MongoDB atlas
export default axios.create({
    baseURL: 'http://localhost:3030',
    headers: {
        'Content-Type': 'application/json'
    }
})