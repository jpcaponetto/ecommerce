import mongoose from "mongoose";

const MONGO_URI = `mongodb+srv://jpcaponetto:Z9o1mXfMAn74YrAd@cluster0.pdigbzn.mongodb.net/ecommerce?retryWrites=true&w=majority`;

export const initMongoDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("La base de datos está corriendo");
  } catch (error) {}
};
