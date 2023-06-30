const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT;

const db = mongoose.connection;
// ro23q2PRPKikKDZZ shayari 
// app.set('view engine', 'ejs');
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static("public"))

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))
mongoose.connect('mongodb+srv://ammar:vJEAsya7hII0lEL0@ammar.z1dmemi.mongodb.net/shayariDB?retryWrites=true&w=majority');
db.on('error', console.error.bind(console, "Failed to Connect to Database"));

const shayariSchema = mongoose.Schema({
    writer: String,
    shayari: String
})

const Shayari = mongoose.model("Shayari", shayariSchema);

app.get('/shayari', (req, res) => {
    // Get the count of all users
    Shayari.countDocuments().exec().then(function (count) {

        // Get a random entrys
        var random = Math.floor(Math.random() * count)
        // console.log(random);
        // Again query all users but only fetch one offset by our random #
        Shayari.findOne().skip(random).exec().then(
            function (result) {
                // Tada! random user
                res.send(result)
            })
    })
})
app.post('/shayari', (req, res) => {
    const newShayari = new Shayari({
        writer: req.body.writer,
        shayari: req.body.shayari
    })
    newShayari.save().then((result) => {
        res.send("Successfully added shayari to database")
    }).catch((err) => {
        res.send(err)
    });
})
db.on('open', () => {
    console.log("Successfully connected to database!");
    app.listen(port, () => {
        console.log(`Server is running on ${port}`)
    })
})
