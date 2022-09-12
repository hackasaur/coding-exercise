fetch("http://localhost:3000/create_profile", {
  method: "post",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },

  //make sure to serialize your JSON body
  body: JSON.stringify({"name":"Gandalf", "description": "lotr", "mbti":"ISFJ", "enneagram": "9w1", "variant":"sp/so", "tritype":"725", "socionics":"SEE", "sloan": "RCOEN", "psyche":"FEVL", "image":"🥸"})
})
.then( async (response) => { 
    text = await response.text()
    console.log(text)
});