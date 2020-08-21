const request =require('request')

const forecast = (latitude,longtitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=7627cf1f302f1a00b7f45eb12c15ea20&query='+latitude+','+longtitude+'&units=m'
    request({url: url,json: true },(error,response)=>{

     if(error){
        callback('unable to connect sever',undefined)
    }else if(response.body.error){
        callback('unable to find location',undefined)
     } else{
        callback(undefined,response.body.current.weather_descriptions[0]+' temperature is '+response.body.current.temperature+'feel like'+response.body.current.feelslike)
            // description: response.body.current.weather_descriptions[0],
            // temperature: response.body.current.temperature,
            // feelslike: response.body.current.feelslike
        }
     })
    
 
}

module.exports=forecast