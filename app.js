const express = require("express");
const http = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});


app.post("/", function (req, res) {
    const query = req.body.cityName; 
    const apikey = "cded1695b6432f63384f805dd7b9e02f"
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units=" + unit;
    http.get(url, function (response) {
        console.log(response.statusCode);
        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<p>The weather is currently " + weatherDescription + " </p>")
            res.write("<h1>the temp in "+query+ " is "+ temp + " degree celsius</h1>");
            res.write("<img src=" + imageURL + ">");
            res.send();

        })
    });
})



app.listen(3000, function (req, res) {
    console.log("server is at port 3000");
})