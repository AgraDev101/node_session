import express from "express"
import { MongoClient } from "mongodb"

const router = express.Router()

// Replace the uri string with your connection string.
// const uri = "mongodb+srv://";

// const client = new MongoClient(uri);

// router.get("/data", async (req, res) => {
//     try {
//         const database = client.db('blog');
//         const post = database.collection('post');
    
//         const query = { title: 'title 1' };
//         const doc = await post.findOne(query);
    
//         console.log(doc);
//         res.send(doc)
//     } finally {
//         await client.close();
//     }
// })

export { router }