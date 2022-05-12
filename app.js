const express=require('express')
const app=express();
const https=require('https')
const bodyparser=require('body-parser');

app.use(bodyparser.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
})



app.post('/',(req,res)=>{
    
    var city=req.body.City;
    
    const apiKey="162ef351fd8c444e216fc134507f1f7f"
    const units="metric"
    https.get('https://api.openweathermap.org/data/2.5/weather?q='+ city+'&appid='+apiKey+'&units='+units,(response)=>{
    
    
    response.on('data',(data)=>{
    let weatherdata=JSON.parse(data)
    let icon=weatherdata.weather[0].icon
    let imageurl='http://openweathermap.org/img/wn/'+ icon+'@2x.png'
    let temp=weatherdata.main.temp
    let weatherdescription=weatherdata.weather[0].description
    res.write('<h1>The temperature in '+ city+' is '+temp+' degree Celsius</h1>')
    res.write("<h1>The Weather description is "+weatherdescription+"</h1>")
    res.write("<img src="+imageurl+">")
    res.send();
    })
    
    })
})



app.listen(3000,()=>{
    console.log('Server is successfully opened on port 3000....')
})