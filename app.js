const express = require("express");
const request = require("request");
const bodyparser = require("body-parser");

const app = express();
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var eMail = req.body.eMail;
    console.log(firstName, lastName, eMail);
})

app.post("/", function (req, res) {
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var eMail = req.body.eMail;
    console.log(firstName, lastName, eMail);


    var data = {
        members: [
            {
                email_address: eMail,
                status: "subscribed"
            }
        ]
    };

    var jsondata = JSON.stringify(data);

    var options = {
        url: "https://us13.api.mailchimp.com/3.0/lists/795b242136",
        method: "POST",
        headers: {
            "Authorization": "ekansh 48d695228ebf196735b9c03bcf1e8635-us13"
        },
        body: jsondata
    }
    request(options, function (error, response, data) {
        if (error) {
            console.log(error);
        }
        else {
            console.log(response.statusCode);
            res.sendFile(__dirname + "/success.html");
        }
    });

});

app.get("/success", function (req, res) {
    res.sendFile(__dirname + "/success.html");
});
app.listen("3000", function () {
    console.log("Server starts at port: 3000");
});





// api key
// 48d695228ebf196735b9c03bcf1e8635-us13

// listid
// 795b242136

// https://us13.api.mailchimp.com/3.0/lists/795b242136