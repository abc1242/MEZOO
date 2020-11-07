
const WebSocket = require("ws");
var Client = require('mongodb').MongoClient;//db추가

const { WSAEWOULDBLOCK } = require("constants");
const { brotliDecompress } = require("zlib");
const { type } = require("os");


// module.exports = function(_server)
// {
const wss = new WebSocket.Server( {port: 3000} );
CLIENTS=[];
APP=[];

var dbms;
var history;
var viewHistory = false;
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
                
                jsonmessage =JSON.parse(message);

                if( jsonmessage.message && (jsonmessage.message == "history")){  //history 버튼 클릭
                    console.log(jsonmessage.message);
                    viewHistory = true;


                    dbo.collection('HiCardi').distinct("DeviceNumber").then(function(result){
                        list = result;
                        message = JSON.stringify(result);
                        
                        for (var i =0; i<CLIENTS.length;i++){
                            CLIENTS[i].send(message);     
                        }
                    })

                } else if(jsonmessage.message&&(jsonmessage.message.length == 5)){   //길이가 5자리 ex)00101
                    console.log(jsonmessage.message)
                    dbo.collection("HiCardi").find({DeviceNumber: jsonmessage.message }).toArray(function(err, result) {
                        message = JSON.stringify(result);
                        
                        for (var i =0; i<CLIENTS.length;i++){
                            CLIENTS[i].send(message);
                        }
                    });

                } else if(jsonmessage.message && (jsonmessage.message == "monitor")){
                        console.log(jsonmessage.message);
                        viewHistory=false;
                } else {
 
                    dbo.collection('HiCardi').insertOne(jsonmessage,function(err,res){
                        if (err) throw err;
                        console.log('db전송완료')
                        // db.close();
                    });                  
                    if(viewHistory == false){
                        console.log('끄긱ㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱ')
                        for (var i =0; i<CLIENTS.length;i++){
                            CLIENTS[i].send(message);
                        }  
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

