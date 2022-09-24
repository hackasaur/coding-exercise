const database = require('../database/db.js')
const { MBTI_categories, Enneagram_categories, Zodiac_categories } = require('./categories.json')

const votesController = (db) => {
    return {
        submitVote: async (req, res) => {
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
                res.status(400).send("Error:MBTI can be only of these categories: " + MBTI_categories.join(",") + `\n    mbti=${vote.mbti}`)
                return
            }
            if (Enneagram_categories.includes(vote.enneagram) == false) {
                res.status(400).send("Error:Enneagram can only be of these categories: " + Enneagram_categories.join(",") + `\n    enneagram=${vote.enneagram}`)
                return
            }

            if (Zodiac_categories.includes(vote.zodiac) == false) {
                res.status(400).send("Error:Zodiac can only be of these categories: " + Zodiac_categories.join(",") + `\n    zodiac=${vote.zodiac}`)
                return
            }

            await database.submitVote(db, userId, profileId, vote)

            res.status(200).send({
                "msg": `The vote "${JSON.stringify(vote)}" was added to the profileId:${profileId} by userId:${userId}`
            }
            )
            return
        },
        getVote: async (req, res) => {
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
        }
    }
}

module.exports = { votesController }