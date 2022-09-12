const database = require('../database/db.js')

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

            res.status(200).send(comments)
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

            await database.insertComment(db, userId, profileId, comment)

            res.status(200).send(
                `The comment "${comment}" was added to the profileId:${profileId} by userId:${userId}`
            )
            return
        }
    }
}
modules.exports = { commentController }