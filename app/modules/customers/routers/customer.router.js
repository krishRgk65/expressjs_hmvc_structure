const customers = require("../controllers/customer.controller.js");
const users = require("../../users/controllers/user.controller");
const jwt = require('jsonwebtoken')
require('dotenv').config();

const authenticateToken =(req, res, next)=>{

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];
    if(!token) return res.sendStatus(401);
  
    jwt.verify(token,process.env.ACCESS_TOKEN,(err,user)=>{
  
  
      if(err){
        return res.sendStatus(403)
      }
      req.user = user;
      next();
    })
  
  }
module.exports = app => {
    app.get("/customers",authenticateToken,customers.getAll);
     app.get("/user1", users.getAll);
    app.post("/customers", customers.store);
    app.post("/login", customers.login);
    app.get("/customers/:customerId", customers.show);
    app.put("/customers/:customerId", customers.update);
    app.delete("/customers/:customerId", customers.destroy);
    require("../../users/routers/user.router")(app);
};

 