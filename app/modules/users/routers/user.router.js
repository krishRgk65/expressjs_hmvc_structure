const users = require("../controllers/user.controller.js");
module.exports = app => {
    app.get("/users", users.getAll);
    app.post("/users", users.store);
    app.get("/users/:userId", users.show);
    app.put("/users/:userId", users.update);
    app.delete("/users/:userId", users.destroy);
};