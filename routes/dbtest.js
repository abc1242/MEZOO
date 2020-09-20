var Client = require('mongodb').MongoClient;//db추가

Client.connect('mongodb://localhost:27017',{useUnifiedTopology:true}, function(error, client){
    if(error) {
        console.log(error);
    } else {
        //console.log("connected:"+db);
        var dbo = client.db('MEZOO');
        //var ms ={"DeviceNumber":"00101","RespirationSignal":[7495],"ECGWaveform":[6749,6878,6980,7090,7210,7319,7418,7519,7624,7709],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:02:37.798","setSound":false};
       
        //dbo.collection('HiCardi').insertOne(ms);
        var x = 'history-00101';//string
        var num = x.split('-');
        console.log(num[1])
        dbo.collection("HiCardi").find({DeviceNumber:  num[1] }).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            //db.close();
          });
    
        //console.log('연결완료'+a );
        //client.close();
    
    }
});