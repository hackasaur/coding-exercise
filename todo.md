Hi Manik, 

Here is the test. You have 48 hours. Best of luck.

This attachment contains the starting code for a node.js server that renders a single static page using mock data.

Part 1:

Store the profile data in a MongoDB database instead of in memory. For ease of testing, use mongodb-memory-server (https://github.com/nodkz/mongodb-memory-server) instead of connecting to an external database.
Add a post route for creating new profiles. Note: you can re-use the same image for all profiles. You do not need to handle picture uploads.
Update the get route to handle profile ids in the url. The server should retrieve the corresponding profile from the database and render the page accordingly.

Part 2:

Implement a backend API that supports the commenting and voting functionality described in the Figma: https://www.figma.com/file/8Iqw3VwIrHceQxaKgGAOBX/HTML%2FCSS-Coding-Test?node-id=0%3A1
You do not need to implement the frontend. Assume that the frontend will call your backend API in order to create user accounts, post comments, get/sort/filter comments, and like/unlike comments.
You do not need to implement secure auth or picture uploads. The only attribute needed for user accounts is name. Assume that anyone can access and use any user account.
All data should be stored in the same database used in Part 1.

Part 3:

Add automated tests to verify the implementation of Part 1 and Part 2.


Voting
The row of tags is how the user submits their vote on what they think the celebrity’s personality is. Voting is optional - the user can vote on as few or as many of the 3 personality systems as they want.

30% opacity. Tapping on tag will show dropdown with personality type options to select and turn to 100% opacity. After selecting result, tag will remain at 100% opacity.

Voting Options
MBTI
INFP, INFJ, ENFP, ENFJ, INTJ, INTP, ENTP, ENTJ, ISFP, ISFJ, ESFP, ESFJ, ISTP, ISTJ, ESTP, ESTJ
Enneagram 
1w2, 2w3, 3w2, 3w4, 4w3, 4w5, 5w4, 5w6, 6w5, 6w7, 7w6, 7w8, 8w7, 8w9, 9w8, 9w1
Zodiac
Aries, Taurus, Gemini, Cancer, Leo, Virgo, Libra, Scorpio, Sagittarius, Capricorn, Aquarius, Pisces

# todo
- [] Update the get route to handle profile ids in the url
- [] server should retrieve the corresponding profile from the database and render the page accordingly
    - [x] app.get(/id) to get profile json
    - [ ] render page
- [] Implement a backend API that supports the commenting and voting functionality described in the Figma
- [] store votes/comments in mongodb
- [] add a volume to mongodb container to persist the db 
- [] add code to append profiles in profile.js and render page using ejs for a `profile[i]` in general for get request through browser 


## things to learn
- mosh exrpess js to change get url
- mongodb. how to use it with nodejs
- reactjs if i still have time to build basic frontend
- ejs
- docker