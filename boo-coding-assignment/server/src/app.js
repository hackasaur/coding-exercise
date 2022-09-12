'use strict';
const database = require('./db.js')
const { MongoClient } = require('mongodb');

let client = await MongoClient.connect('mongodb://mongodb:27017/myappdb');

let db

database.connectToDb(db, client)

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

let MBTI_categories = ["INFP", "INFJ", "ENFP", "ENFJ", "INTJ", "INTP", "ENTP", "ENTJ",
    "ISFP", "ISFJ", "ESFP", "ESFJ", "ISTP", "ISTJ", "ESTP", "ESTJ"]

let Enneagram_categories = ["1w2", "2w3", "3w2", "3w4", "4w3", "4w5", "5w4", "5w6", "6w5",
    "6w7", "7w6", "7w8", "8w7", "8w9", "9w8", "9w1"]

let Zodiac_categories = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio",
    "Sagittarius", "Capricorn", "Aquarius", "Pisces"]


app.get('/all_profiles', async (req, res) => {
    let profiles = await database.getAllProfiles(db)
    res.status(200).send(profiles)
})

app.get('/profile/:id', async (req, res) => {
    let { id } = req.params
    let profile = await database.getProfileById(db, id)
    res.status(200).send(profile)
})

app.post('/create_profile', async (req, res) => {
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

    console.log(Object.keys(profile))
    for (let key of Object.keys(profile)) {
        if (!profile[key]) {
            res.status(400).send(`${key} is undefined\n   ${key}=${profile.key}`)
            return
        }
    }

    if (MBTI_categories.includes(mbti) == false) {
        res.status(400).send("Error:MBTI can be only of these categories:" + MBTI_categories.join(",") + `\n    mbti=${mbti}`)
        return
    }
    if (Enneagram_categories.includes(enneagram) == false) {
        res.status(400).send("Error:Enneagram can only be of these categories:" + MBTI_categories.join(",") + `\n    enneagram=${enneagram}`)
        return
    }

    await database.createProfile(db, profile)

    res.status(200).send(
        `${JSON.stringify(profile)} \n profile is added to the database`
    )
    return
})

app.get('/get_comments/:profileId/:userId/', async (req, res) => {
    let { userId, profileId} = req.params

    if (!userId) {
        res.status(400).send("Error:UserId is not defined")
        return
    }
    if (!profileId) {
        res.status(400).send("Error:profileId is not defined")
        return
    }

    let comments = await database.getComments(db, userId, profileId)

    res.status(200).send(comments)
    return
})

app.post('/submit_comment/', async (req, res) => {
    let { userId, profileId, comment } = req.body

    if (!userId) {
        res.status(400).send("Error:UserId is not defined")
        return
    }
    if (!profileId) {
        res.status(400).send("Error:profileId is not defined")
        return
    }
    if (!comment) {
        res.status(400).send("Error:comment is not defined")
        return
    }

    await database.submitComment(db, userId, profileId, comment)

    res.status(200).send(
        `The comment "${comment}" was added to the profileId:${profileId} by userId:${userId}`
    )
    return
})

app.post('/submit_vote', async (req, res) => {
    let { userId, profileId, vote } = req.body

    if (!userId) {
        res.status(400).send("Error:UserId is not defined")
        return
    }
    if (!profileId) {
        res.status(400).send("Error:profileId is not defined")
        return
    }
    if (!vote) {
        res.status(400).send("Error:vote is not defined")
        return
    }

    if (MBTI_categories.includes(vote.mbti) == false) {
        res.status(400).send("Error:MBTI can be only of these categories:" + MBTI_categories.join(",") + `\n    mbti=${vote.mbti}`)
        return
    }
    if (Enneagram_categories.includes(vote.enneagram) == false) {
        res.status(400).send("Error:Enneagram can only be of these categories:" + Enneagram_categories.join(",") + `\n    enneagram=${vote.enneagram}`)
        return
    }

    if (Zodiac_categories.includes(vote.zodiac) == false) {
        res.status(400).send("Error:Zodiac can only be of these categories:" + Zodiac_categories.join(",") + `\n    zodiac=${vote.zodiac}`)
        return
    }

    await database.submitVote(db, userId, profileId, vote)
    
    res.status(200).send(
        `The vote "${JSON.stringify(vote)}" was added to the profileId:${profileId} by userId:${userId}`
    )
    return
})

app.get('/get_vote/:profileId/:userId/', async (req, res) => {
    let { userId, profileId } = req.params

    if (!userId) {
        res.status(400).send("Error:UserId is not defined")
        return
    }
    if (!profileId) {
        res.status(400).send("Error:profileId is not defined")
        return
    }

    let vote = await database.getVote(db, userId, profileId)

    res.status(200).send(vote)
})