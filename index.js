const express = require('express');
const app = express();

const weatherRequest = require('./utils/weatherRequest');
const geoCode = require('./utils/geoCode');

const port = process.env.PORT || 3001;

app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/getForecast',(req,res)=>{

    const address =  req.query.address;
    console.log(address);

    geoCode(address,(geoError,geoData)=>{
        

        if(geoError){
            const ans = {
                error: "something went wrong"
            };
            res.send(JSON.stringify(ans));
        }
        else if(geoData.error){
            const ans = {
                error: "place not found"
            };
            res.send(JSON.stringify(ans));
        }
        else{
            const {latitude,longitude,location} = geoData;
            weatherRequest(latitude,longitude,location, (weatherError,weatherData)=>{
                const ans = {
                    forecast: weatherData
                }
                res.send(JSON.stringify(ans));
            });
        }
    

    });
});
app.listen(port,()=>{
    console.log("listen");
});



