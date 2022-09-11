'use strict';
const service = require('./service.js')
const { MongoClient } = require('mongodb');

let client, db

const connectToDb = async () => {
    client = await MongoClient.connect('mongodb://mongodb:27017/myappdb');
    db = client.db()
    try{
        await db.createCollection("profiles")
    } 
    catch
    { console.log("collection profiles already exists")}

    const items = await db.collection("profiles").find().toArray()
    console.log(items)

    return db
}

connectToDb()

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// set the view engine to ejs
app.set('view engine', 'ejs');

// add json middleware *
app.use('/:id', express.json())

// routes
app.use('/', require('./routes/profile')());

// start server
const server = app.listen(port);
console.log('Express started. Listening on %s', port);

// let profiles = []

let MBTI_categories = ["INFP", "INFJ", "ENFP", "ENFJ", "INTJ", "INTP", "ENTP", "ENTJ", "ISFP", "ISFJ", "ESFP", "ESFJ", "ISTP", "ISTJ", "ESTP", "ESTJ"]

let Enneagram_categories = ["1w2", "2w3", "3w2", "3w4", "4w3", "4w5", "5w4", "5w6", "6w5", "6w7", "7w6", "7w8", "8w7", "8w9", "9w8", "9w1"]

let Zodiac_categories = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"]


app.get('/all_profiles',async (req, res) => {
    let profiles = await service.getAllProfiles(db)
    res.status(200).send(profiles)
})

app.get('/profile/:id',async (req, res) => {
    let {id} = req.params
    let profile = await service.getProfileById(db, id)
    res.status(200).send(profile)
})

app.post('/create_profile',async (req, res) => {
    let {
        name,
        description,
        mbti,
        enneagram,
        variant,
        tritype,
        socionics,
        sloan,
        psyche,
        image,
    } = req.body


    if (!name) {
        res.status(400).send(`name is undefined   name=${name}`)
    }
    if (!description) {
        res.status(400).send(`Error:description is undefined\n   description=${description}`)
    }
    if (MBTI_categories.includes(mbti) == false) {
        res.status(400).send(`Error:MBTI can be only of these categories: INFP, INFJ, ENFP, ENFJ, INTJ, INTP, ENTP, ENTJ, ISFP, ISFJ, ESFP, ESFJ, ISTP, ISTJ, ESTP, ESTJ\n    mbti=${mbti}`)
    }
    if (Enneagram_categories.includes(enneagram) == false) {
        res.status(400).send(`Error:Enneagram can only be of these categories: 1w2, 2w3, 3w2, 3w4, 4w3, 4w5, 5w4, 5w6, 6w5, 6w7, 7w6, 7w8, 8w7, 8w9, 9w8, 9w1\n    enneagram=${enneagram}`)
    }
    if (!variant) {
        res.status(400).send(`Error:variant is undefined\n    variant=${variant}`)
    }
    if (!tritype) {
        res.status(400).send(`Error:tritype is undefined\n    tritype=${tritype}`)
    }
    if (!socionics) {
        res.status(400).send(`Error:socionics is undefined\n    socionics=${socionics}`)
    }
    if (!sloan) {
        res.status(400).send(`Error:sloan is undefined\n    sloan=${sloan}`)
    }
    if (!psyche) {
        res.status(400).send(`Error:psyche is undefined\n   psyche=${psyche}`)
    }
    if (!image) {
        res.status(400).send(`Error:image is undefined\n    image=${image}`)
    }

    let profile = {
        "name": name,
        "description": description,
        "mbti": mbti,
        "enneagram": enneagram,
        "variant": variant,
        "tritype": tritype,
        "socionics": socionics,
        "sloans": sloan,
        "psyche": psyche,
        "image": image,
    }

    await service.createProfile(db, profile)

    res.status(200).send(
        `${JSON.stringify(profile)} \n profile added to database successfully!`
        )
})

app.post('/submit_comment/:id', async (req, res) => {
    let {id} = req.params
})