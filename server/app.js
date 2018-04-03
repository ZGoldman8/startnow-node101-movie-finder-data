const express = require("express");
const app = express();
const morgan = require("morgan");
const axios = require("axios");
var cache = {};

//May want to put .catch in the .use line;
app.use(morgan("combined"));
app.get("/", function (req, res) {
    if (req.query.i) {
        var movieID = req.query.i;

        if (cache[movieID]) {
            var data = cache[movieID];
            return res.json(data);
        } else {
        axios.get("http://www.omdbapi.com/?i=" + movieID + "&apikey=8730e0e")
            .then(function (response) {
                var data = response.data;
                cache[movieID] = data;
                res.status(200).send(data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }} 
        else if (req.query.t) {
        var movieTitle = req.query.t;
        
        if (cache[movieTitle]) {
            var data = cache[movieTitle];
            return res.json(data);
            
        } else {
        axios.get("http://www.omdbapi.com/?t=" + encodeURI(movieTitle) + "&apikey=8730e0e")
            .then(function (response) {
                var data = response.data;
                cache[movieTitle] = data;
                res.status(200).send(data);
            })
            .catch(function (error) {
                console.log(error);
            });
        };
    };
});

// When making calls to the OMDB API make sure to append the '&apikey=8730e0e' parameter

module.exports = app;