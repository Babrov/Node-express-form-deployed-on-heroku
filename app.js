const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const https = require('https');
const { response } = require('express');

app.use(express.static(__dirname));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/signup.html');
});

app.post('/', (req, res) => {
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let email = req.body.email;

  let data = {
    members: [
      {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };
  let jsonData = JSON.stringify(data);

  const url = '';

  const options = {
    method: 'POST',
    auth: 'HERE SHOULD BE YOUR API KEY',
  };

  const request = https.request(url, options, (response) => {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + '/success.html');
    } else {
      res.sendFile(__dirname + '/failure.html');
    }
    response.on('data', (data) => {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);

  request.end();
});
app.post('/failure', (req, res) => {
  res.redirect('/');
});
app.listen(process.env.PORT || 3000, () => {
  console.log('server started');
});
