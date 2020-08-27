var Client = require('mongodb').MongoClient;//db추가

Client.connect('mongodb://localhost:27017', function(error, client){
    if(error) {
        console.log(error);
    } else {
        console.log("connected:"+db);
        var db = client.db('MEZOO');
        var ms ={"DeviceNumber":"00101","RespirationSignal":[7495],"ECGWaveform":[6749,6878,6980,7090,7210,7319,7418,7519,7624,7709],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:02:37.798","setSound":false};
       
        db.collection('HiCardi').insert(ms);
        
        client.close()    
    }
    
});