import express from "express";
import { Book } from "../models/BookModel.js";

const router = express.Router();




    //API TO POST AN BOOK
    router.post("/book", async (request, response) => {
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
    router.get("/get/allbooks", async (request, response) => {
      try {
        const books = await Book.find({});
        return response.status(201).send(books);
      } catch (error) {
        return response.status(500).send({ message: error.message });
      }
    })
  
  
      //API TO GET SINGLE BOOK BY ID
      router.get("/get/book/:id", async (request, response) => {
        try {
          const {id} = request.params
          const book = await Book.findById(id);
          if(!book)
          {
            return response.status(401).send("Book Not Found!!")
          }
          else{

            
          return response.status(201).send(book);

          }
        } catch (error) {
          return response.status(500).send({ message: error.message });
        }
      })
  
  
  
      //API TO UPDATE BOOK
      router.put("/edit/book/:id", async (request, response)=>{
  
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
  
  
  
      //API TO DELETE BOOK
      router.delete('/delete/book/:id', async (req, res)=>{
  
  
          try {
              const {id} = req.params;
              const book = await Book.findByIdAndDelete(id);
              if(!book)
              {
                  return res.status(401).send({message:"Book Not Found!!"})
              } 
              else{
              return res.status(401).send("Book Deleted Succesfully!!")
  
              }
          } catch (error) {
  
              return res.status(401).send({message:error.message})
              
          }
  
  
      })
  

      export default router;