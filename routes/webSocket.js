
const WebSocket = require("ws");
var Client = require('mongodb').MongoClient;//db추가
//let fs = require('fs');
const { WSAEWOULDBLOCK } = require("constants");
const { brotliDecompress } = require("zlib");
//let writer = fs.createWriteStream('test.txt');

// module.exports = function(_server)
// {
const wss = new WebSocket.Server( {port: 3000} );
CLIENTS=[];
APP=[];

var dbms;
var history;

wss.on('connection', function(ws, req){
    console.log('서버연결')
    Client.connect('mongodb://localhost:27017', function(error, client){
        if(error) {
            console.log(error);
        } else {
            console.log('db연결');
            var dbo = client.db('MEZOO');

            if (req.headers.header =="app") {  
                APP.push(ws);
                console.log('app연결')
            } else {
                CLIENTS.push(ws); 
                console.log('client연결')
               
            }
            
            ws.on('message', function(message){
                var x = message.split('-');
                if(x[0]=='history'){
                    var inputnumber = 
                    dbo.collection("HiCardi").find({DeviceNumber:  x[1] }).toArray(function(err, result) {
                    if (err) throw err;
                        CLIENTS.send(result);   //history 전송
                    });
                } else {
 
                    dbms =JSON.parse(message);
                    dbo.collection('HiCardi').insert(dbms);                  
                    console.log('db전송완료')
                    //writer.write(message+'\n'); //데이터 -> txt
                    for (var i =0; i<CLIENTS.length;i++){
                        CLIENTS[i].send(message);
                        //APP[i].send(message);
                        //console.log(message)  
                    }  
               }
            });

            // ws.on('error', function(error){
            //     console.log("에러" + error);
            // })
        
            // ws.on('close', function(){
            //     console.log("연결 끝");
            // })     
            
            //client.close()    
        }
        
    });
});


// }

