```shell
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"name":"Isildur", "description": "lotr", "mbti":"ISFJ", "enneagram": "9w1", "variant":"sp/so", "tritype":"725", "socionics":"SEE", "sloan": "RCOEN", "psyche":"FEVL", "image":"🥸"}' \
  http://localhost:3000/create_profile --verbose


curl --header "Content-Type: application/json" \
    http://localhost:3000/all_profiles --verbose


curl --header "Content-Type: application/json" \
    http://localhost:3000/get_comments/631e25ad9a2f40ec4f9dcd5b/631e277ae30176554953bd9b --verbose

curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"userId":"631e277ae30176554953bd9b", "profileId":"631e25ad9a2f40ec4f9dcd5b", "comment":"Hi Gandalf - Gladriel"}' \
  http://localhost:3000/submit_comment --verbose

curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"userId":"631e277ae30176554953bd9b", "profileId":"631e25ad9a2f40ec4f9dcd5b", "vote":{"mbti":"ISFJ","enneagram":"1w2", "zodiac":"Cancer"}}' \
  http://localhost:3000/submit_vote --verbose


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
    --network mongo-node-network \
    --name mongodb \
    --volume mongodata:/data/db \
	mongo

docker run --interactive --tty \
    --publish 3000:3000 \
    --mount type=bind,source="$(pwd)",target=/server \
    --network mongo-node-network \
    coding-exercise bash
```