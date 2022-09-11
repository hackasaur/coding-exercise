```shell
docker build --tag myappimage .

docker run --interactive --tty \
    --publish 3000:3000 \
    --mount type=bind,source="$(pwd)",target=/server \
    --name myapp \
    --network mongo-node-network \
    myappimage bash


curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"name":"Isildur", "description": "lotr", "mbti":"ISFJ", "enneagram": "9w1", "variant":"sp/so", "tritype":"725", "socionics":"SEE", "sloan": "RCOEN", "psyche":"FEVL", "image":"🥸"}' \
  http://localhost:3000/create_profile --verbose


curl --header "Content-Type: application/json" \
    http://localhost:3000/all_profiles --verbose


docker run -d --network mongo-node-network --name mongodb \
	-e MONGO_INITDB_ROOT_USERNAME=mongoadmin \
	-e MONGO_INITDB_ROOT_PASSWORD=secret \
	mongo


docker run --interactive --tty \
    --publish 27017:27017 \
    --network mongo-node-network \
    --name mongodb \
	mongo

docker run --interactive --tty \
    --publish 3000:3000 \
    --mount type=bind,source="$(pwd)",target=/server \
    --network mongo-node-network \
    coding-exercise bash
```