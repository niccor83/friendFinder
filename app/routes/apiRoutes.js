
// Dependencies
var path = require("path");


var friends = require("../data/friends");

// ROUTING
// ===============================================================================

module.exports = function (app) {
    
    // API GET Requests
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    // API POST Requests
    app.post("/api/friends", function (req, res) {
        var difference = 0;
        var match = {
            name: "",
            photo: "",
            totalDifference: 1000
        };
        var userData = req.body;
        var userName = userData.name;
        userScores = userData.scores;

        var b = userScores.map(function(item) {
            return parseInt(item, 10);
        });
        userData = {
            name:req.body.name,
            phot: req.body.photo,
            scores: b
        };

        console.log("Name: " + userName);
        console.log("User score " + userScores);

        var sum = b.reduce((a,b) => a + b, 0);
        console.log("Sum of users score " + sum);
        console.log("Best match friend diff " + match.friendDifference);
        console.log("===================================================");

        for(var i = 0; i < friends.length; i++){
            console.log(friends[i].name);
            difference = 0;
            console.log("Total Diff " + difference);
            console.log("Best match friend diff " + match.friendDifference);
        

            var bfriendScore =friends[i].scores.reduce((a, b) => a + b, 0);
            console.log("Total friend score " + bfriendScore);
            difference += Math.abs(sum - bfriendScore);
            console.log("--------------------------> " + difference);

            if(difference <= match.friendDifference) {
                match.name = friends[i].name;
                match.photo = friends[i].photo;
                match.friendDifference = difference;
            }
            console.log(difference + " Total Difference")
        }

        console.log(match);
        friends.push(userData);
        console.log("New user added");
        console.log(userData);
        res.json(match);
    });
};