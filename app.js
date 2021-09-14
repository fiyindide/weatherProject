const express = require("express");
const https = require("https");
const { dirname } = require("path");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
   res.sendFile(__dirname + "/index.html");
   
});

app.post("/", function(req,res){
   
   const query = req.body.cityName;
   const units = "metric";
   const id = "6c0ba140226cc046c54a50af86651e9a";
   const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + units + "&appid=" + id;

   https.get(url, function(response){
      console.log(response.statusCode);

      response.on("data", function(data){
         const weatherData = JSON.parse(data);
         const temp = weatherData.main.temp;
         const weatherDescription = weatherData.weather[0].description; 
         const weatherIcon = weatherData.weather[0].icon; 
         const iconURL = "https://openweathermap.org/img/wn/" + weatherIcon+ "@2x.png";
         res.write("<p>The weather is currently " + weatherDescription + "<p>"); 
         res.write("<h1>The current temperature in " + query+ " is " + temp + " degree celcius</h1>");
         res.write("<img src =" + iconURL+ ">");
         res.send();
      });
   });
});

app.listen(3000, function(){
   console.log("server is running on port 3000");
})

   
   