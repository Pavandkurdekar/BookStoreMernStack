import React, { useEffect, useState } from "react";
import axios from "axios";


const HomeBook = () => {
  const [books, setBooks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);


  //FETCHES ALL BOOKS WHEN APPLICATION RUNS FOR THE FIRST TIME
   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5555/api/get/allbooks"
        );
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);



//EDIT MODEL OPNS WHEN CLICKED ON EDIT ICON
const openModal = (book)=>{
  setSelectedBook(book)
  console.log(selectedBook)
  setIsModalOpen(true)
}



//EDIT MODEL CLOSES WHEN CLICKED ON CANCEL
const closeModal= ()=>{
  setIsModalOpen(false)
}




//UPDATES THE OLD NOTE 
const savechanges = async(editedbook)=>{
const bookid = editedbook._id

  try{
    const res = await axios.put(`http://localhost:5555/api/edit/book/${bookid}`,editedbook)
    console.log(res)

    //FETCHES ONCE AGAIN ALL NOTES SO THAT UPDATED NOTE SHOULD BE VISIBLE ON THE UI AS SOON AS IT IS EDITED
    const response = await axios.get("http://localhost:5555/api/get/allbooks");
    setBooks(response.data);
  }
  catch(error)
  {
    console.log(error)
  }
}
 

//DELETE BOOK
const deletebook = async (id) => {
  try {
    console.log(id);
    const res = await axios.delete(`http://localhost:5555/api/delete/book/${id}`);
    console.log(res);
    if (res.status === 200) {
      // Book deleted successfully
      const response = await axios.get("http://localhost:5555/api/get/allbooks");
      setBooks(response.data);
    } else {
      // Handle other status codes if needed
      console.log("Book deletion failed:", res.data.message);
    }
  } catch (error) {
    console.log("Error deleting book:", error);
  }

}

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From the blog</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Learn how to grow your business with our expert advice.
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {books.map((book) => (
            <article key={book._id} className="flex max-w-xl flex-col items-start justify-between">
              <div className="flex items-center gap-x-4 text-xs">
                <time className="text-gray-500">
                  {book.publishYear}
                </time>
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                  <span className="absolute inset-0" />
                  {book.title}
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{book.summary}</p>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4">
                <img src={book.author.imageUrl} alt="" className="h-10 w-10 rounded-full bg-gray-50" />
                <div className="text-sm leading-6">
                  <p className="font-semibold text-gray-900">
                    <a href={book.author}>
                      <span className="absolute inset-0" />
                      {book.author}
                    </a>
                  </p>
                </div>
              </div>
              
          
          <i className="fa-regular fa-pen-to-square" onClick={()=>{openModal(book);  }} ></i>
                  <i className="fa-solid fa-trash" onClick={()=>{deletebook(book._id); }}></i>
            </article>
            
          ))}
          {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Edit Book</h2>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={selectedBook.title}
                onChange={(e) =>
                  setSelectedBook({ ...selectedBook, title: e.target.value })
                }
                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Summary
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={selectedBook.summary}
                onChange={(e) =>
                  setSelectedBook({ ...selectedBook, summary: e.target.value })
                }
                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="author"
                className="block text-sm font-medium text-gray-700"
              >
                Author
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={selectedBook.author}
                onChange={(e) =>
                  setSelectedBook({ ...selectedBook, author: e.target.value })
                }
                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="publishYear"
                className="block text-sm font-medium text-gray-700"
              >
                Publish Year
              </label>
              <input
                type="number"
                id="publishYear"
                name="publishYear"
                value={selectedBook.publishYear}
                onChange={(e) =>
                  setSelectedBook({
                    ...selectedBook,
                    publishYear: parseInt(e.target.value),
                  })
                }
                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              onClick={() => {
                closeModal();
                savechanges(selectedBook);
              }}
            >
              Save
            </button>
            <button
              className="bg-gray-300 text-gray-700 ml-2 px-4 py-2 rounded-lg"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
        </div>
      </div>
  
    </div>
    

  );
}

export default HomeBook;
