const { validateToken } = require("../services/authentication");

function checkForAuthentication(cookieName){
  return (req,res,next)=>{
    
    const tokenValue = req.cookies[cookieName];
    console.log(tokenValue);
    if(!tokenValue)
      next();

    try{
      const userPayload = validateToken(tokenValue);
      req.user = userPayload;
    }catch(e){
      res.status(404).json({message: e.message});
    }
    next();

  }
}

module.exports = {checkForAuthentication};