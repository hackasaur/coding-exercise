const { ObjectId } = require('mongodb');
const { MongoClient } = require('mongodb');

const connectToDb = async (mongoURI) => {
    let client = await MongoClient.connect(mongoURI);
    let db = client.db()
    try {
        await db.createCollection("profiles")
    }
    catch
    { console.log("collection 'profiles' already exists") }

    try {
        await db.createCollection("comments")
    }
    catch
    { console.log("collection 'comments' already exists") }

    try {
        await db.createCollection("votes")
        await db.collection("votes").createIndex({"userId" : 1, "profileId" :1}, {unique : true})
    }
    catch
    { console.log("collection 'votes' already exists") }

    const items = await db.collection("profiles").find().toArray()
    console.log(items)

    return db
}

const getProfileById = async (db, id) => {
    let profile = db.collection("profiles").find({ "_id": ObjectId(id) }).toArray()
    return profile
}

const getAllProfiles = async (db) => {
    profiles = await db.collection("profiles").find().toArray()
    return profiles
}

const createProfile = async (db, profile) => {
    await db.collection("profiles").insertOne(profile)
    return profile
}

const insertComment = async (db, userId, profileId, comment) => {
    await db.collection("comments").insertOne({ profileId: profileId, userId: userId, comment: comment })
}

const getComments = async (db, userId, profileId) => {
    let comments = await db.collection("comments").find({profileId: profileId, userId: userId}).toArray()
    return comments
}

const submitVote = async (db, userId, profileId, vote) => {
    await db.collection("votes").insertOne({ profileId: profileId, userId: userId, vote: vote })
}

const getVote = async (db, userId, profileId) => {
    let vote = await db.collection("votes").find({ profileId: profileId, userId: userId}, {userId:0, profileId:0, vote:1}).toArray()
    return vote
}

module.exports = {connectToDb, getProfileById, getAllProfiles, createProfile, submitComment: insertComment, getComments, submitVote, getVote}