import Mongoose from "mongoose";

const ConnectedDB = async () => {
  try {
    const connected = await Mongoose.connect(process.env.MONGO_URL || " ");
    console.log(` conneted to mongodb ${connected.connection.host}`);
  } catch (error) {
    console.error("e1", error);
  }
};

export default ConnectedDB;
