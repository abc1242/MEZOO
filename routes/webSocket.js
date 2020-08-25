
const WebSocket = require("ws");

let fs = require('fs');
const { WSAEWOULDBLOCK } = require("constants");
let writer = fs.createWriteStream('test.txt');

// module.exports = function(_server)
// {
const wss = new WebSocket.Server( {port: 3000} );
CLIENTS=[];
APP=[];

wss.on('connection', function(ws, req){
    console.log('req.headers.header' +req.headers.header)
    if (req.headers.header =="app") {  
        APP.push(ws);
        console.log('app연결')
    } else {
        CLIENTS.push(ws); 
        console.log('client연결')
    }
    
    ws.on('message', function(message){
        //console.log('메세지' +message); 
        writer.write(message+'\n'); //데이터 -> txt
        for (var i =0; i<CLIENTS.length;i++){
            CLIENTS[i].send(message);
            //APP[i].send(message);
            //console.log(message)    
        }
        //ws.send(message);
    });

    // ws.on('error', function(error){
    //     console.log("에러" + error);
    // })

    // ws.on('close', function(){
    //     console.log("연결 끝");
    // })     

    
});


// }

