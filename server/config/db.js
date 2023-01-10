const mongoose = require("mongoose");

const ConnectedDB = async () => {
  try {
    const connected = await mongoose.connect(process.env.MongoURl);
    console.log(`connected ${connected.connection.host}`);
  } catch (err) {
    console.log(err);
  }
};

module.exports = ConnectedDB;
