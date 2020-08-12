const wsModule = require("ws");

module.exports = function(_server)
{
    const wss = new wsModule.Server( {server:_server} );
    
    wss.on('connection', function(ws, req){

        ws.on('message', function(message){
            console.log(message);
            ws.send("데이터" +message);
        });

        ws.on('error', function(error){
            console.log("에러" + error);
        })

        ws.on('close', function(){
            console.log("연결 끝");
        })
    });
}