'use strict';
const database = require('./database/db.js')
const { MongoClient } = require('mongodb');

// let client = await MongoClient.connect('mongodb://mongodb:27017/myappdb');
let client = await MongoClient.connect(process.env['MONGO_URI']);
let db
database.connectToDb(db, client)

const {profileController} = require('./controllers/profiles.js')
const profile = profilesController(db) 
const {commentController} = require('./controllers/comments.js')
const comment = commentController(db)
const {votesController} = require('./controllers/votes.js')
const votes = votesController(db)

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

app.get('/profile/:id', async (req, res, db) => {
    let { id } = req.params
    let profile = await database.getProfileById(db, id)
    res.status(200).send(profile)
})

app.post('/create_profile', profile.createProfile(req, res))

app.get('/get_comments/:profileId/:userId', comment.getComments(req, res))

app.post('/submit_comment/', comment.submitComments(req, res))

app.post('/submit_vote', async (req, res) => {
})

app.get('/get_vote/:profileId/:userId/', async (req, res) => {
})