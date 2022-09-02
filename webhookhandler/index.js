require('dotenv').config();
const express = require('express');
const services = require( './services' );

const app = express();
app.use(express.json());

app.post('/update', (req, res) => {
    services.update( req.body );
    res.status( 200 ).json({ ok:'ok'})
});

const PORT = process.env.PORT || 1000;
app.listen(PORT, () => console.log(`services run in http://localhost:${PORT}`));