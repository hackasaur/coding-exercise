const database = require('../database/db.js')
const { MBTI_categories, Enneagram_categories, Zodiac_categories } = require('./categories.json')

const commentController = (db) => {
    return {
        getComments: async (req, res) => {
            let { userId, profileId } = req.params

            if (!userId) {
                res.status(400).send("Error:UserId is not defined")
                return
            }
            if (!profileId) {
                res.status(400).send("Error:profileId is not defined")
                return
            }

            let comments = await database.getComments(db, userId, profileId)

            res.status(200).send({ "comments": comments, "msg": `comments for the profileId:${profileId} by userId:${userId}`})
            return
        },
        submitComments: async (req, res) => {
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

            let commentRecord = { profileId: profileId, userId: userId, comment: comment }

            await database.insertComment(db, commentRecord)

            res.status(200).send(
                { "comment": commentRecord, "msg": `The comment: "${comment}" was added to the profileId:${profileId} by userId:${userId}` }
            )
            return
        }
    }
}
module.exports = { commentController }