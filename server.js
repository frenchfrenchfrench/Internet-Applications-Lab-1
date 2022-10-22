const express = require('express')
const fetch = require ('node-fetch')
const key = '4c9d757d2dd8edb2a9bbc182f0d9f260'
const app = express()
const port = 3000
const path=require("path")
let publicPath= path.resolve(__dirname,"public")
app.use(express.static(publicPath))
app.get('/random/:min/:max', sendrandom)
app.get('/getweather/:city', getWeather)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
function sendrandom(req, res) {
    let min = parseInt(req.params.min);
    let max = parseInt(req.params.max);
    if (isNaN(min) || isNaN(max)) {
        res.status(400);
        res.json( {error : "Bad Request."});
        return;
    }
    let result = Math.round( (Math.random() * (max - min)) + min);
    res.json( { result : result });
    
}
//getWeather()
function getWeather(req, res){
    // Get Geocode
    var city = req.params.city
    fetch('http://api.openweathermap.org/geo/1.0/direct?q='+city+'&appid='+key+'').then(response => response.json()).then(function (response){
        fetch('http://api.openweathermap.org/data/2.5/forecast?lat='+response[0].lat+'&lon='+response[0].lon+'&appid='+key+'').then(response => response.json()).then(function (response){
            return res.json(response)
        })
    })

    
    
    
    //Get Weather

    //Get Pollution

    //Return

    //TODO Error Check
}


//api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

