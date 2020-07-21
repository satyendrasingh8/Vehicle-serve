
const request = require('request');

const forecast =(lon,lat,callback)=>{
    const url = 'https://openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid=439d4b804bc8187953eb36d2a8c26a02'
        request({url:url,json:true},(error,{body})=>{
            if(error){
                callback('unable to connect weather services',undefined)
            }
            else if(body.error)
            {
                callback('unable to find',undefined)
            }
            else {
                callback(undefined,' temperature is : ' 
           +body.main.temp+ ' and humidity is : '+body.main.humidity
                )
            }
        })
    }
    
    module.exports=forecast
    