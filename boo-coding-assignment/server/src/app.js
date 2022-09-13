'use strict';
const database = require('./database/db.js')

const MONGO_URI = process.env['MONGO_URI']

const { profilesController } = require('./controllers/profiles.js')
const { commentController } = require('./controllers/comments.js')
const { votesController } = require('./controllers/votes.js')

let profile, comment, vote

database.connectToDb(MONGO_URI).then((db) => {
    {
        profile = profilesController(db)
        comment = commentController(db)
        vote = votesController(db)
    }
})

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// set the view engine to ejs
app.set('view engine', 'ejs');

// add json middleware *
app.use('/:id', express.json())


// start server
const server = app.listen(port);
console.log('Express started. Listening on %s', port);

app.get('/all_profiles', async (req, res) => { profile.getAllProfiles(req,res)})

app.get('/profile/:id', async (req, res) => {profile.getProfileById(req, res)})

app.post('/create_profile', async (req, res) => { await profile.createProfile(req, res) })

app.get('/get_comments/:profileId/:userId', async (req, res) => { await comment.getComments(req, res) })

app.post('/submit_comment/', async (req, res) => { await comment.submitComments(req, res) })

app.post('/submit_vote', async (req, res) => { await vote.submitVote(req, res) })

app.get('/get_vote/:profileId/:userId/', async (req, res) => { await vote.getVote(req, res) })