import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateBook = () => {
  const [book ,setBook] = useState({
    title: '',
    summary: '',
    author: '',
    publishYear: ''
  });
  const [isEmptyField, setIsEmptyField] = useState(false); // State to track empty fields
  const navigate = useNavigate();

  const {title, author, summary, publishYear} = book;

  const onInputChange = (e) =>{
    setBook({...book, [e.target.name]: e.target.value});
  };

  const createBook = async (e) => {
    e.preventDefault();
    // Check if any required field is empty
    if (!title || !author || !summary || !publishYear) {
      setIsEmptyField(true);
      return; // Stop further execution
    }
    try {
      const response = await axios.post("http://localhost:5555/api/book/", book);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div>
      <form>
        <div className="space-y-12">
          
          <div className="border-b border-gray-900/10 pb-12" style={{ "margin": "auto", "width": "60%", "marginTop": "80px" }}>
            <h2 className="text-base font-semibold leading-7 text-gray-900">Author</h2>
            <input
              type="text"
              name="author"
              value={author}
              className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
              onChange={onInputChange}
            />
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  Title
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="title"
                      value={title}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      onChange={onInputChange}
                      required // Make title field required
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                  Summary
                </label>
                <div className="mt-2">
                  <textarea
                    required // Make summary field required
                    id="about"
                    name="summary"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={summary}
                    onChange={onInputChange}
                  />
                </div>
                <div style={{"marginTop":"20PX"}}>
                  <label >Publish Year:</label>
                  <input 
                    type="number" 
                    className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md" 
                    name="publishYear" 
                    value={publishYear}  
                    onChange={onInputChange}
                    required // Make publishYear field required
                  />
                </div>
              </div>
            </div>

            {isEmptyField && (
              <div className="mt-2 text-red-600">All fields are required!</div>
            )}

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={handleCancel}>
                Cancel
              </button>
              <button
                type="submit"
                onClick={createBook}
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateBook;
