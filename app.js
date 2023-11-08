// import protocol
import http from 'http';
import fs from 'fs';
import { contenType } from './mod/contenType.mjs';
import { entryPoint } from './routes/route.mjs';

// declare port
let port = 3217;

let serv = http.createServer((req, res)=> {
  entryPoint(req, res, contenType)
    
})

serv.listen(port, ()=> {
  console.log(`
http://localhost:${port}
`)
})

