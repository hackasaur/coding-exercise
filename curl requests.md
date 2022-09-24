```shell
(create profile)
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"name":"Gladriel", "description": "Elf", "mbti":"INTJ", "enneagram": "9w1", "variant":"sp/so", "tritype":"725", "socionics":"SEE", "sloan": "RCOEN", "psyche":"FEVL", "image":"🧝"}' \
  http://localhost:3000/create_profile --verbose

(create profile)
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"name":"Gandalf", "description": "Wizard", "mbti":"ENTJ", "enneagram": "9w1", "variant":"sp/so", "tritype":"725", "socionics":"SEE", "sloan": "RCOEN", "psyche":"FEVL", "image":"🧙"}' \
  http://localhost:3000/create_profile --verbose

(get profiles)
curl --header "Content-Type: application/json" \
    http://localhost:3000/all_profiles --verbose

(get profile by ID)
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
$ curl --header "Content-Type: application/json" \
    http://localhost:3000/get_vote/<profileId>/<userId> --verbose

```