let profile1 = {
    "name": "Gandalf", "description": "The wizard", "mbti": "ISFJ",
    "enneagram": "9w1", "variant": "sp/so", "tritype": "725", "socionics": "SEE",
    "sloan": "RCOEN", "psyche": "FEVL", "image": "🧙"
}

let profile2 = {
    "name": "Gladriel", "description": "The elf", "mbti": "ENTJ",
    "enneagram": "9w1", "variant": "sp/so", "tritype": "725", "socionics": "SEE",
    "sloan": "RCOEN", "psyche": "FEVL", "image": "🧝"
}

let comment = "Hi Gandalf, it's me Gladriel"

let URL = 'http://localhost:3000'

//express routes
let createProfile = 'create_profile'
let getProfileById = 'profile'
let submitComment = 'submit_comment'
let getComment = 'get_comment'
let submitVote = 'submit_vote'
let getVote = 'get_vote'

//create a profile and get it to test app.post('/create_profile') and app.get('/get_profile')

let profile1_id, profile2_id

//testing app.post('/create_profile')

fetch(`${URL}/${createProfile}`, {
    method: "post",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },

    //make sure to serialize your JSON body
    body: JSON.stringify(profile1)

}).then(async (response) => {
    text = await response.text()
    console.log("\nResponse of post request at /create_profile:", text)
    console.log("\n")

    let profile
    try {
        profile = JSON.parse(text)["profile"]
    }
    catch {
        console.log("[FAIL]", `Did not receive any profile in response from server after POST request at '${URL}/${createProfile}'\n`)
    }

    profile1_id = profile["_id"]

    //testing app.get('/profile/:id')

    fetch(`${URL}/${getProfileById}/${profile1_id}`, {
        method: "get",
        headers: {
            'Accept': 'application/json',
        }
    }).then(async (response) => {
        text = await response.text()
        console.log(`Response of get request at '${getProfileById}/${profile1_id}':`, text)
        console.log("\n")

        let profile

        try {
            profile = JSON.parse(text)["profile"][0]
        }
        catch {
            console.log("[FAIL]", `Did not receive any profile in response from server after GET request at '${URL}/${getProfileById}/${profile1_id}\n`)
        }

        for (let key of Object.keys(profile1)) {
            if (profile[key] != profile1[key]) {
                console.log(`[FAIL]`, `"${key}":"${profile[key]}" response does not match with profile1\n`)
                break
            }
        }

        console.log(`[PASS] app.post('/${createProfile}') and app.get/${getProfileById}/:id are working properly\n`)
    })
})


fetch(`${URL}/${submitComment}`, {
    method: "post",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },

    //make sure to serialize your JSON body
    body: JSON.stringify(profile1)

}).then(async (response) => {
    text = await response.text()
    console.log("\nResponse of post request at /create_profile:", text)
    console.log("\n")


