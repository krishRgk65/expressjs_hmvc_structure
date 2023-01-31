const User = function(user) {
    this.email = user.email;
    this.name = user.name;
    this.active = user.active;
  };
  User.table = "users";
  module.exports = User;