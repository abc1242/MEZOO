
const WebSocket = require("ws");

let fs = require('fs');
let writer = fs.createWriteStream('test.txt');

module.exports = function(_server)
{
    const wss = new WebSocket.Server( {server:_server} );
    
    wss.on('connection', function(ws, req){
 
        ws.on('message', function(message){
            console.log(message);
            ws.send(message);

            writer.write(message+'\n'); //데이터 -> txt

        });

        ws.on('error', function(error){
            console.log("에러" + error);
        })

        ws.on('close', function(){
            console.log("연결 끝");
        })
        
    });

}

