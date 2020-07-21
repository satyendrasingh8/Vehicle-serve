const request = require('request');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
// const url ='https://samples.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=439d4b804bc8187953eb36d2a8c26a02'

// request({url:url,json:true},(error,response) =>{
//     if(error)
//     {
//         console.log("unable to accesss weather data")
//     } else if(response.body.error)
//     {
//         console.log("unable to find location")
//     }
//     else { 
//     console.log(response.body.main.temp) }
// })

// const url2="https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoic2F0eWVuZHJhc2luZ2g4IiwiYSI6ImNrYnRuNDN3dDBiaDkydnQ3YmRxNWcydXAifQ.tr_MEbf9jWuYY0ELCYX_YA&limit=1"

// request({url:url2,json:true},(error,response) => {
//     const lon=response.body.features[0].center[0];
//     const lat = response.body.features[0].center[1];
//     if(error)
//     {
//         console.log("unable to accesss weather data")
//     } else if(response.body.features.length===0)
//     {
//         console.log("unable to find location")
//     }
//     else { 
//         console.log('longitude : '+lon+"  and latitude : "+lat)
//      }
    
// })

const address=process.argv[2];


if(!address)
{
    console.log('please provide valid address')
}
else{

    geocode(address,(error,{lon,lat,location})=>{
        if (error)
        {
          return console.log(error)
        }
    
    forecast(lon,lat,(error,forecastData)=>{
        if (error)
        {
            return console.log(error)
        }
          console.log(location)
          console.log(forecastData)
        })
    
    })
    
    
    
}




















