const { ObjectId } = require('mongodb');

const connectToDb = async (db, client) => {
    // let client = await MongoClient.connect('mongodb://mongodb:27017/myappdb');
    db = client.db()
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
    await db.collection("profiles").insert(profile)
    return profile
}

const submitComment = async (db, userId, profileId, comment) => {
    await db.collection("comments").insert({ profileId: profileId, userId: userId, comment: comment })
}

const getComments = async (db, userId, profileId) => {
    let comment = await db.collection("comments").find({profileId: profileId, userId: userId}).toArray()
    return comment
}

const submitVote = async (db, userId, profileId, vote) => {
    await db.collection("votes").insert({ profileId: profileId, userId: userId, vote: vote })
}

const getVote = async (db, userId, profileId) => {
    let vote = await db.collection("votes").find({ profileId: profileId, userId: userId}, {userId:0, profileId:0, vote:1}).toArray()
    return vote
}

module.exports = {connectToDb, getProfileById, getAllProfiles, createProfile, submitComment, getComments, submitVote, getVote}