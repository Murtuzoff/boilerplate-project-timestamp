require('dotenv').config();
const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static('public'));

app.get("/style.css", (req, res) => {
  res.sendFile(__dirname + '/style.css');
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/hello", (req, res) => {
  res.json({ greeting: 'hello API' });
});

app.get("/api/:date", (req, res) => {

  let dateParam = req.params.date;
  let date;

  if (!isNaN(dateParam)) {
    date = new Date(parseInt(dateParam));
  } else {
    date = new Date(dateParam);
  }

  if (isNaN(date.getTime())) {
    res.json({
      error: "Invalid Date"
    })
  } else {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString(),
    });
  }
});

app.get("/api/", (req, res) => {
  const timeInMs = Date.now();
  const timeUTC = new Date().toUTCString();
  res.json({
    unix: timeInMs,
    utc: timeUTC,
  });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
