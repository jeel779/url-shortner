const jwt=require("jsonwebtoken")
const secret="jeel$1234"
function setUser(user) {
    return jwt.sign({
       _id:user._id,
      email:user.email
    }, secret);
}

function getUser(token){
  try{
    return jwt.verify(token,secret)
  }catch(err){
    return null
  }
}

module.exports = {
  setUser,
  getUser,
};