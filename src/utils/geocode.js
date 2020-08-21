const request =require('request')

const geocode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibnV0dGFwYXQiLCJhIjoiY2tkenJvMjZzMXNoNTJwbm9lNWtxaWFxcSJ9.CpZKLJcurxlIa3kVTCiF8A&limit=1#'
    
    request({url:url,json:true},(error,response)=>{
            if(error){
                callback('unable to connect sever',undefined)
            }else if(response.body.features.length ===0){
                callback('unable to find location',undefined)
            }else{
                callback(undefined,{
                    latitude : response.body.features[0].center[1],
                    longtitude : response.body.features[0].center[0],
                    location: response.body.features[0].place_name
                })
            }
    })
}

module.exports=geocode