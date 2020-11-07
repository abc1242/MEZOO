const { Db } = require('mongodb');

var Client = require('mongodb').MongoClient;//db추가

Client.connect('mongodb://localhost:27017',{useUnifiedTopology:true}, function(error, client){
    if(error) {
        console.log(error);
    } else {
        //console.log("connected:"+db);
        var dbo = client.db('MEZOO');
        //var ms ={"DeviceNumber":"00101","RespirationSignal":[7495],"ECGWaveform":[6749,6878,6980,7090,7210,7319,7418,7519,7624,7709],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:02:37.798","setSound":false};
       

        dbo.collection("HiCardi").find({DeviceNumber: '00102', ArrhythmiaAnnotation: }).toArray(function(err, result) {
              if (err) throw err;
              console.log(result);
              console.log(typeof(result));
        });
        //db 조회 
        //dbo.collection('HiCardi').insertOne(ms);
        // var x = 'history-00101';//string
        // var num = x.split('-');
        // console.log(num[1])
        // dbo.collection("HiCardi").find({DeviceNumber:  num[1] }).toArray(function(err, result) {
        //     if (err) throw err;
        //     console.log(result);


        //db 리스트 조회
        // dbo.collection('HiCardi').distinct("DeviceNumber").then(function(result){
        //     console.log(result[0]);
        //     console.log(typeof(result[0]));


        //     var x = '00101';


        //     if ( result.includes(x)){
        //         console.log('aaaaaaa');
        //     }
        // })
        
        //console.log(result);
            //db.close();
        //   });
        
        
        
        // dbms =JSON.parse(message);
        // dbo.collection('HiCardi').insertOne(dbms,function(err,res){
        // if (err) throw err;
        //     console.log('db전송완료')
                        
        //             });        
        //console.log('연결완료'+a );
        //client.close();
    
    }
});





//sms test


// const accountSid = 'AC3b40155aa16df9656782d12fde96b383';
// const authToken = '15eb1636611f186de55bfbb52e4d501e';
// const client = require('twilio')(accountSid, authToken);

// client.messages
//   .create({
//      body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
//      from: '+15714186931',
//      to: '+821025277242'
//    })
//   .then(message => console.log(message.sid));
