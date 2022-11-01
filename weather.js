const express = require('express');
const https = require('https');
const app = express();
const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({extended:true}));
const apikey = "36ba1e4db2dc142b666f25b85d84169c";


app.listen(4000,function(){

  console.log("the server has started localhost:4000");
})
app.get("/",function(request,response){
    response.sendFile(__dirname + "/index.html");

});
app.post("/",function(request,response){
  var cityname = request.body.cityname;
  const apikey = "36ba1e4db2dc142b666f25b85d84169c";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+cityname+"&appid="+apikey;
      https.get(url,function(res){
        res.on("data",function(data){

          var weatherinfo = JSON.parse(data);
          var weather = weatherinfo.weather[0].main;
          var temperature = weatherinfo.main.temp;
          var place = weatherinfo.name;
          var icon = weatherinfo.weather[0].icon;
          var imgURL = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
          response.write(" <h1>The weather in " + place + " is " + weather  +  "</h1>");
          response.write(" The temperature in " + place + " is "  +  temperature  + " degree celcius<br>");
          response.write("<img src="+ imgURL +">");
          response.send();
        });

      });

});
// https.get(url,function(res){
//   res.on("data",function(data){
//     const apikey = "36ba1e4db2dc142b666f25b85d84169c";
//     const url = "https://api.openweathermap.org/data/2.5/weather?q=madikeri&appid="+apikey;
//     var weatherinfo = JSON.parse(data);
//     var weather = weatherinfo.weather[0].main;
//     var temperature = weatherinfo.main.temp;
//     var place = weatherinfo.name;
//     var icon = weatherinfo.weather[0].icon;
//     var imgURL = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
//     response.write(" <h1>The weather in " + place + " is " + weather  +  "</h1>");
//     response.write(" The temperature in " + place + " is "  +  temperature  + " degree celcius<br>");
//     response.write("<img src="+ imgURL +">");
//     response.send();
//   });
//
// });
