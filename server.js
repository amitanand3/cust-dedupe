const express = require('express');
const bodyparser = require("body-parser");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyparser.json());

app.post('/savexml', (req, res) => {
    fs.writeFile('data.xml', req.body.xml, (err) => {
        if (err) throw err;
    });
    res.send(req.body.xml);
});

app.listen(port, () => console.log(`Listening on port ${port}`));