const database = require('../database/db.js')
const {MBTI_categories, Enneagram_categories, Zodiac_categories} = require('./categories.json')

const profilesController = (db) => {
    return {
        createProfile: async (req, res) => {
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
                {"profile":profile, msg: "profile is added to the database"}
            )
            return
        },
        getProfileById: async (req, res) => {
            let { id } = req.params
            let profile = await database.getProfileById(db, id)
            res.status(200).send(profile)
        },
        getAllProfiles: async (req, res) => {
            let profiles = await database.getAllProfiles(db)
            res.status(200).send(profiles)
        }
    }
}

module.exports = { profilesController }