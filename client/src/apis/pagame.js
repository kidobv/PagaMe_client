import axios from 'axios'
//3001 port for json-server 
//3000 port for NodeJS server with MongoDB atlas
export default axios.create({
   // baseURL: 'http://54.173.140.184:3000',
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json'
    }
})