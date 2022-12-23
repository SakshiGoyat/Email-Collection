const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.static("public")); // keep all the static files inside this folder

app.get("/", (req1, res1) => {
  res1.sendFile(__dirname + "/index.html");
});

app.post("/", (reqPost, resPost) => {
  const fName = reqPost.body.fName;
  const lName = reqPost.body.lName;
  const email = reqPost.body.email;
  const password = reqPost.body.password;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: fName,
          LNAME: lName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us21.api.mailchimp.com/3.0/lists/cbf88b1c46";

  const options = {
    method: "POST",
    auth: "sakshi:9151dea299ccd23837572e1fbbf972e0-us21",
  };

  const storeData = https.request(url, options, (resHttps) => {
    if (resHttps.statusCode === 200) {
      resPost.send("<h1>Your response is successfully submitted.</h1>");
    } else {
      resPost.send(
        "<h1>Your response is not successfully submitted. Try Again later!!!!!!!!!!   </h1>"
      );
    }
    resHttps.on("data", function (data) {
      console.log("data is stored");
    });
  });

  storeData.write(jsonData);
  storeData.end();
});

app.listen(port, () => {
  console.log(`listening to port number ${port}`);
});

//api key
// 9151dea299ccd23837572e1fbbf972e0-us21

// list Id
// cbf88b1c46;
