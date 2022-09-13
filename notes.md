```shell
(create profile)
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"name":"Gladriel", "description": "Elf", "mbti":"ISFJ", "enneagram": "9w1", "variant":"sp/so", "tritype":"725", "socionics":"SEE", "sloan": "RCOEN", "psyche":"FEVL", "image":"🥸"}' \
  http://localhost:3000/create_profile --verbose

(get all profiles)
curl --header "Content-Type: application/json" \
    http://localhost:3000/all_profiles --verbose

(get all profiles)
curl --header "Content-Type: application/json" \
    http://localhost:3000/profiles/<profile-id> --verbose

(get comments)
curl --header "Content-Type: application/json" \
    http://localhost:3000/get_comments/<profileId>/<userId> --verbose

(submit comment)
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"userId":"<id>", "profileId":"<id>", "comment":"Hi Gandalf - Gladriel"}' \
  http://localhost:3000/submit_comment --verbose

(submit vote)
curl --header "content-type: application/json" \
  --request post \
  --data '{"userid":"<id>", "profileid":"<id>", "vote":{"mbti":"ISFJ","enneagram":"1w2", "zodiac":"Cancer"}}' \
  http://localhost:3000/submit_vote --verbose

(get vote)
curl --header "Content-Type: application/json" \
    http://localhost:3000/get_vote/631e25ad9a2f40ec4f9dcd5b/631e277ae30176554953bd9b --verbose

(image)
docker build --tag myappimage .

(container node)
docker run --interactive --tty \
    --publish 3000:3000 \
    --mount type=bind,source="$(pwd)",target=/server \
    --name myapp \
    --network mongo-node-network \
    myappimage bash

(container mongo)
docker run -d --network mongo-node-network --name mongodb \
	-e MONGO_INITDB_ROOT_USERNAME=mongoadmin \
	-e MONGO_INITDB_ROOT_PASSWORD=secret \
	mongo

docker run --interactive --tty \
    --publish 27017:27017 \
    --network mongo-net\
    --name mongodb \
    --volume mongodata:/data/db \
	mongo

docker run --interactive --tty \
    --publish 3000:3000 \
    --mount type=bind,source="$(pwd)",target=/server \
    --network mongo-net \
    --env MONGO_URI='mongodb://mongodb:27017/myappdb' \
    --name booApp \
    boo bash
```

## test
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"name":"Gladriel", "description": "Elf", "mbti":"ISFJ", "enneagram": "9w1", "variant":"sp/so", "tritype":"725", "socionics":"SEE", "sloan": "RCOEN", "psyche":"FEVL", "image":"🧝"}' \
  http://localhost:3000/create_profile --verbose


curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"name":"Gandalf", "description": "Wizard", "mbti":"ISFJ", "enneagram": "9w1", "variant":"sp/so", "tritype":"725", "socionics":"SEE", "sloan": "RCOEN", "psyche":"FEVL", "image":"🧙"}' \
  http://localhost:3000/create_profile --verbose


curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"userId":"631f0268eb14649b35c45d3b", "profileId":"631f027deb14649b35c45d3c", "comment":"Hey are you there? part 2"}' \
  http://localhost:3000/submit_comment --verbose


curl --header "Content-Type: application/json" \
    http://localhost:3000/get_comments/631f027deb14649b35c45d3c/631f0268eb14649b35c45d3b --verbose

curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"userId":"631f05d0be388d469b7cc2b6", "profileId":"631f05c1be388d469b7cc2b5", "vote":{"mbti":"ISFJ","enneagram":"1w2", "zodiac":"Cancer"}}' \
  http://localhost:3000/submit_vote --verbose

curl --header "Content-Type: application/json" \
    http://localhost:3000/get_vote/631f05c1be388d469b7cc2b5/631f05d0be388d469b7cc2b6 --verbose