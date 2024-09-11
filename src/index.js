// require('dotenv').config({path: './env'});
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import {app} from "./app.js";

dotenv.config({
  path: './env'
});

connectDB()
  .then(() => {
    // Start the server
    const server = app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port ${process.env.PORT || 8000}`);
    });

    // Proper way to handle server-related errors
    server.on("error", (error) => {
      console.error("ERROR:", error);
      throw error; // Throw the error to indicate a critical issue
    });
  })
  .catch((error) => {
    console.log("MONGODB connection failed !!!", error);
  });























// Approach - 1
// import express from "express";
// const app = express();

// // IIFE
// (async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         app.on("error...", (error) => {
//             console.error("ERROR: ",error);
//             throw error;
//         })

//         app.listen(process.env.PORT, () => {
//             console.log(`App is listening on port ${process.env.PORT}`);
//         })

//     } catch (error) {
//         console.error("ERROR: ",error);
//         throw error;
//     }
// })()