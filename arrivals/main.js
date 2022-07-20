const request = require('request')
const express = require('express')

const app = express()
const port = 3000
const url = 'https://www.isavia.is/fids/arrivals.aspx';
const url2 = 'https://www.isavia.is/fids/departures.aspx';

const makeResponse = (response) => {
    let info = {};
    request.get({
        url: url,
        json: true,
        headers: { 'User-Agent': 'node' },
        }, (err, res, data) => {
            if (err) {
               response.send("Villa að sækja gögn");
            }
            else if (res.statusCode !== 200) {
                response.send(`Villa að kalla á Isavia API: ${res.statusCode}`);
            }
            else {
                const mappedData = data.Items.map(item => {
                    return { gate: item.Gate, eta: item.Scheduled, status: item.Status, ad: item.Departure }
                });
                response.send(mappedData);
            }
        }
    )
}

const makeResponse2 = (response) => {
    let info = {};
    request.get({
        url: url2,
        json: true,
        headers: { 'User-Agent': 'node' },
        }, (err, res, data) => {
            if (err) {
               response.send("Villa að sækja gögn");
            }
            else if (res.statusCode !== 200) {
                response.send(`Villa að kalla á Isavia API: ${res.statusCode}`);
            }
            else {
                const mappedData = data.Items.map(item => {
                    return { gate: item.Gate, eta: item.Scheduled, status: item.Status, ad: item.Departure }
                });
                response.send(mappedData);
            }
        }
    )
}



app.get('/', async (req, res) => {
    res.set('Content-Type', 'application/json');
    data = makeResponse(res);
});

app.listen(port, () => {
    console.log('Keyrandi flugvélaapp Port 3000');
});


