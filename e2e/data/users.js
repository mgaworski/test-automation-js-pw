module.exports = () =>  ({
  validUser: {
    name: "practice",
    password: process.env.SUPER_SECRET_PASSWORD
  },
  invalidNameUser: {
    name: "Gandalf",
    password: process.env.SUPER_SECRET_PASSWORD
  },
  invalidPasswordUser: {
    name: "practice",
    password: "SayFriendAndEnter"
  },
  registerUser: {
    name: "john",
    password: "SayMyNameSayMyName!"
  },
  shortPasswordUser: {
    name: "john",
    password: "abc"
  }
});