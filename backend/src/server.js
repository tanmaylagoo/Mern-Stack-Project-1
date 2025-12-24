import express from 'express';
import notesRoutes from './routes/notesRoutes.js';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import rateLimiter from './middleware/rateLimiter.js';
import cors from "cors";

dotenv.config();




const app = express();
const PORT = process.env.PORT




//.use method for making the middleware
//this works after we hit send from postman since middleware is what is between the request from the client side and response from the server side


app.use(cors({
  origin:"http://localhost:5173"
}))
app.use(express.json())//this middleware will parse JSON bodies: req.body

app.use(rateLimiter)

/*app.use((req, res, next)=>{
  console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
  next();
  //simple custom middleware 

})*/

app.use('/api/notes', notesRoutes);

/**
 * An endpoint is a combination of a URL and HTTP method that lets the client interact with a specific resource 
 */

connectDB().then(()=>{
  app.listen(PORT, ()=>{
  console.log("Server Started on port:", PORT);   
})
})


/**
 * we are using REST API which uses HTTP methods
 * GET: gets some posts or any data
 * PUT: updates post
 * POST: creates a post
 * DELETE: deletes a post
 * The purpose of the API is to be the middle-man and protect the server from malicious client
 */


// 