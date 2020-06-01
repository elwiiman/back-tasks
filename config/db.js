const mongoose = require("mongoose");
require("dotenv").config({ path: "secret.env" });
//
const connectDB = async () => {
  try {
    const x = await mongoose.connect(process.env.DB_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
      //
    });

    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  } catch (error) {
    console.log(error);
    process.exit(1); //Stop the app
  }
};

module.exports = connectDB;
