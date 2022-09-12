let profile1 = {
    "name": "Gandalf", "description": "The wizard", "mbti": "INFP",
    "enneagram": "9w1", "variant": "sp/so", "tritype": "725", "socionics": "SEE",
    "sloan": "RCOEN", "psyche": "FEVL", "image": "🧙"
}

let profile2 = {
    "name": "Gladriel", "description": "The elf", "mbti": "ENTJ",
    "enneagram": "9w1", "variant": "sp/so", "tritype": "725", "socionics": "SEE",
    "sloan": "RCOEN", "psyche": "FEVL", "image": "🧝"
}

let testComment = "Hi Gandalf, it's me Gladriel"

let testVote = { "mbti": "INFP", "enneagram": "1w2", "zodiac": "Cancer" }

let URL = 'http://localhost:3000'

//express routes
let createProfile = 'create_profile'
let getProfileById = 'profile'
let submitComment = 'submit_comment'
let getComments = 'get_comments'
let submitVote = 'submit_vote'
let getVote = 'get_vote'

/*create a profile using POST request and retrieve it using GET request from the server to test 
app.post('/create_profile') and app.get('/get_profile')
*/

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
    let text = await response.text()
    console.log("\nResponse of post request at /create_profile:", JSON.parse(text))
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
        let text = await response.text()
        console.log(`Response of GET request at '${URL}/${getProfileById}/${profile1_id}':`, JSON.parse(text))
        console.log("\n")

        let profile

        try {
            profile = JSON.parse(text)["profile"][0]
        }
        catch {
            console.log("[FAIL]", `Did not receive any profile in response from server after GET request at '${URL}/${getProfileById}/${profile1_id}\n`)
        }

        let result = true
        for (let key of Object.keys(profile1)) {
            if (profile[key] != profile1[key]) {
                console.log(`[FAIL]`, `"${key}":"${profile[key]}" response does not match with profile1\n`)
                result = false
                break
            }
        }

        if (result) {
            console.log(`[PASS] app.post('/${createProfile}') and app.get/${getProfileById}/:id are working properly\n`)
        }
    })

    //create another profile for testing comments, votes functionality

    fetch(`${URL}/${createProfile}`, {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(profile2)

    }).then(async (response) => {
        text = await response.text()

        let profile
        profile = JSON.parse(text)["profile"]
        profile2_id = profile["_id"]

        //submit comments on profile1 by profile2 
        fetch(`${URL}/${submitComment}`, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: `{"userId":"${profile1_id}", "profileId":"${profile2_id}", "comment":"${testComment}"}`
        }).then(async (response) => {
            text = await response.text()
            console.log(`Response of POST request at '${URL}/${submitComment}:`, JSON.parse(text))
            console.log('\n')
            let commentRecord = JSON.parse(text)["comment"]
            let commentID = commentRecord["_id"]

            //then get the comments submitted before
            fetch(`${URL}/${getComments}/${profile2_id}/${profile1_id}`, {
                method: "get",
                headers: {
                    'Accept': 'application/json',
                }
            }).then(async (response) => {
                text = await response.text()
                console.log(`Response of GET request at '${URL}/${getComments}/${profile1_id}/${profile2_id}:`, JSON.parse(text))
                console.log('\n')

                let comments

                try {
                    comments = JSON.parse(text)["comments"]
                }
                catch {
                    console.log("[FAIL]", `Did not receive comments in response from server after GET request at '${URL}/${getComments}/${profile1_id}/${profile2_id}'\n`)
                }

                for (let comment of comments) {
                    if (comment["_id"] == commentID) {
                        if (comment["comment"] == testComment)
                            console.log("[PASS]", `comment has matched! app.post('/${submitComment}') and app.get('/${getComments}) are working correctly\n`)
                        break
                    }
                }
            })
        })
        console.log(`{"userId":"${profile1_id}", "profileId":"${profile2_id}", "vote":${JSON.stringify(testVote)}}`)

        //submit vote on profile1 by profile2 
        fetch(`${URL}/${submitVote}`, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: `{ "userId": "${profile1_id}", "profileId": "${profile2_id}", "vote": ${JSON.stringify(testVote)} }`
        }).then(async (response) => {
            text = await response.text()
            console.log(`Response of POST request at '${URL}/${submitVote}:`, JSON.parse(text))
            console.log('\n')

                //then get the vote submitted before
                fetch(`${URL}/${getVote}/${profile2_id}/${profile1_id}`, {
                    method: "get",
                    headers: {
                        'Accept': 'application/json',
                    }
                }).then(async (response) => {
                    text = await response.text()
                    console.log(`Response of GET request at '${URL}/${getVote}/${profile1_id}/${profile2_id}:`, JSON.parse(text))
                    console.log('\n')

                    let vote
                    try {
                        vote = JSON.parse(text)[0]["vote"]
                    }
                    catch {
                        console.log("[FAIL]", `Did not receive comments in response from server after GET request at '${URL}/${getComments}/${profile1_id}/${profile2_id}'\n`)
                    }

                    let result = true
                    for (let key of Object.keys(profile1)) {
                        if (testVote[key] != vote[key]) {
                            console.log(`[FAIL]`, `"${key}":"${vote[key]}" response does not match with testVote\n`)
                            result = false
                            break
                        }
                    }
                    if (result) {
                        console.log(`[PASS] vote recieved and matched! app.post('/${submitVote}') and app.get('/${getVote}) are working correctly`)
                    }
                })
        })
    })
})