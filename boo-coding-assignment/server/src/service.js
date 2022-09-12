const { ObjectId } = require('mongodb');

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

module.exports = {getProfileById, getAllProfiles, createProfile, submitComment, getComments, submitVote, getVote}