const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/potluckparty", {
  useNewUrlParser: true
});

module.exports = mongoose.connection;
