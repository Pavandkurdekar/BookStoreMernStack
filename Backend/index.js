import express, { request } from "express";
import { PORT, MongoURL } from "./Config.js";
import mongoose from "mongoose";
import { Book } from "./models/BookModel.js";

const app = express();
app.use(express.json());

mongoose
  .connect(MongoURL)
  .then(() => {
    console.log("Connected To Mongo Successfully!!!");
    app.listen(PORT, () => {
      console.log(`App Is Listening At Port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.get("/", (req, res) => {
  const response = "Hello World!!";
  res.send(response);
});

//API TO POST AN BOOK
app.post("/book", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send("All Fields Are Mandatory!!");
    } else {
      const newBook = {
        title: request.body.title,
        author: request.body.author,
        publishYear: request.body.publishYear,
      };

      const book = await Book.create(newBook);
      return response.status(201).send(book);
    }
  } catch (error) {
    return response.status(500).send({
      message: error.message,
    });
  }
})



  //API TO GET ALL BOOKS FROM DATABASE
  app.get("/get/allbooks", async (request, response) => {
    try {
      const books = await Book.find({});
      return response.status(201).send(books);
    } catch (error) {
      return response.status(500).send({ message: error.message });
    }
  })


    //API TO GET SINGLE BOOK BY ID
    app.get("/get/book/:id", async (request, response) => {
      try {
        const {id} = request.params
        const book = await Book.findById(id);
        return response.status(201).send(book);
      } catch (error) {
        return response.status(500).send({ message: error.message });
      }
    })



    //API TO UPDATE BOOK
    app.put("/edit/book/:id", async (request, response)=>{

      try {
        const {id} = request.params;
        const book = await Book.findById(id)
        if(!book)
        {
          return response.status(404).send("Book Not Found!!");
        }


        else if(!request.body.title || !request.body.author || !request.body.publishYear )
        {
          return response.status(400).send("All Fields Are Mandatory!!");
        }
        else{

        
          const result = await Book.findByIdAndUpdate(id, request.body);
            const editednote = await Book.findById(id) 
            return response.status(200).send(editednote);
          
        }
        
      } catch (error) {
       
        return response.status(500).send({ message: error.message });
      
      }

    })



    //API DELETE BOOK
    
