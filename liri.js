// Requires the data in my .env file 
require("dotenv").config();

// Declares variables for dependencies 
var keys = require("./keys.js");
Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var moment = require("moment");
var fs = require("fs");
var axios = require("axios");

// Variable for user commands ("concert-this" "spotify-this-song" "movie-this" "do-what-it-says")
var command = process.argv[2];

// Variable for user data inputs
var userInput = process.argv[3];


// Bands in Town function
function concert(userInput) {
    // Use axios to get data from Bands in Town API
    axios.get("https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp").then(
        function (response) {
            var date = moment(response.data[0].datetime).format('MM/DD/YYYY');
            console.log("Venue name: " + response.data[0].venue.name);
            console.log("Venue location: " + response.data[0].venue.city);
            console.log("Date: " + date);
            console.log("=================================================================================");
        }
    )
    // Is there is an error
    .catch(function(error) {
        if (error.response) {
          console.log("---------------Data---------------");
          console.log(error.response.data);
          console.log("---------------Status---------------");
          console.log(error.response.status);
          console.log("---------------Status---------------");
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
}; 
// concert(userInput);

// Spotify function
function spotifySearch(userInput) {
    // If the user inputs nothing, use the song, "The Sign"
    if (!userInput) {
        userInput = "The Sign";
        spotifySearch(userInput);
    } 
    // Or search whatever track they input and limit the search to 3 results
    else { 
        spotify.search({ 
            type: "track", 
            query: userInput,
            limit: 3
        }) 
        .then(function(response) {
            let songObject = response.tracks.items;
            console.log(response);
            for (i = 0; i < songObject.length; i ++) {
            console.log("Artist: " + songObject[i].songs.artists.name);
            console.log("Song name: " + songObject[i].songs.name);
            console.log("Preview: " + songObject[i].songs.preview_url);
            console.log("Album name: " + songObject[i].songs.album.name);
            console.log("=================================================================================")};
    })
    // If there is an error
    .catch(function(error) {
        if (error.response) {
          console.log("---------------Data---------------");
          console.log(error.response.data);
          console.log("---------------Status---------------");
          console.log(error.response.status);
          console.log("---------------Status---------------");
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
    
}}; 
// spotifySearch(userInput);

// OMDB function
function movie(userInput) {
    // If the user inputs nothing, display data for the movie, "Mr. Nobody"
    if (!userInput) {
        userInput = "mr nobody";
        movie(userInput);
    } 
    // Or search for whatever the user inputs using axios and the OMDB API
    else {
        axios.get("http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy").then(
            function (response) {
                console.log("Title: " + response.data.Title);
                console.log("Year: " + response.data.Year);
                console.log("IMDB rating: " + response.data.imdbRating);
                console.log("Rotten Tomatoes: " + response.data.Ratings[1].Value);
                console.log("Country: " + response.data.Country);
                console.log("Language: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);
                console.log("=================================================================================");
            }
        )
        // If there is an error
        .catch(function(error) {
            if (error.response) {
              console.log("---------------Data---------------");
              console.log(error.response.data);
              console.log("---------------Status---------------");
              console.log(error.response.status);
              console.log("---------------Status---------------");
              console.log(error.response.headers);
            } else if (error.request) {
              console.log(error.request);
            } else {
              console.log("Error", error.message);
            }
            console.log(error.config);
          });
    }
};

// Do What It Says (fs) function
function doWhatItSays() {
    // Access the text content in random.txt using the fs package
    fs.readFile("random.txt", "utf8", function (error, content) {
        if (error) {
            return console.log(error);
        }
        console.log(content);

        // ??
        var array = content.split(",");

        // ??
        var command = array[0];
        let userInput = array[1];

        function doSearch() {
            if (command === "concert-this") {
                concert(userInput);
            } else if (command === "spotify-this-song") {
                spotifySearch(userInput);
            } else if (command === "movie-this") {
                movie(userInput);
            }
        }
        doSearch();
    });
};

// Switch/cas function to make the program work
function liri() {
    switch(command) {
        case "concert-this":
            concert(userInput)
            break;
        case "spotify-this-song":
            spotifySearch(userInput)
            break;
        case "movie-this":
            movie(userInput)
            break;
           case "do-what-it-says":
               doWhatItSays()
               break;
    }
} liri(); 

// function liri() {
//     if (command == "concert-this") {
//         concert(userInput);
//     } else if (command == "spotify-this-song") {
//         spotifySearch(userInput);
//     } else if (command == "movie-this") {
//         movie(userInput);
//     } else if (command == "do-what-it-says") {
//         doWhatItSays();
//     } else (console.log("Give a command"))
// } liri();