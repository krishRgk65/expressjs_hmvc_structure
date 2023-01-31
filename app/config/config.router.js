module.exports = app => {
    
    app.get("/", (req, res) => {
        res.json({ message: "Welcome to application." });
      });
require("../modules/customers/routers/customer.router")(app);
require("../modules/users/routers/user.router")(app);
};