const expres = require('express');
const axios = require('axios');
const cors = require('cors');
const app = expres();
const PORT = 3001 || process.env.PORT;

app.use(cors({
    origin : '*'
}));


app.get('/', (req, res) => {
    res.send("SERVER IS UP!");
})
app.get('/:city', async (req, res) => {
    try {
        const weather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${req.params.city}&appid=d3fe3b9184c85b7b49da9e30b7dbf0de`);
        const temp = weather.data.main.temp - 273.15;
        res.status(200).send({msg:"ok", temp});
    } catch(err) {
        res.status(400).send({msg:err.message})
    }
})


app.listen(PORT, () => {
    console.log('server is running');
});