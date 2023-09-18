import React, { useState, useEffect } from "react";

const getLocalItems = () => {
  const storedData = localStorage.getItem("todoData");
  if (storedData) {
    return JSON.parse(localStorage.getItem("todoData"));
  } else {
    return [];
  }
};

export default function Todo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [add, setAdd] = useState(getLocalItems());
  const [editIndex, setEditIndex] = useState(-1);
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem("todoData", JSON.stringify(add));
  }, [add]);

  const addItem = (e) => {
    e.preventDefault();
    if (!title || !description) {
      setError("Please enter both title and description");
    } else if (editIndex === -1) {
      setAdd([...add, { title, description }]);
      setTitle("");
      setDescription("");
    } else {
      const updatedList = [...add];
      updatedList[editIndex] = { title, description };
      setAdd(updatedList);
      setEditIndex(-1);
      setTitle("");
      setDescription("");
    }
  };

  const closeError = () => {
    setError("");
  };

  const deletebtn = (id) => {
    const updatedList = add.filter((_, ind) => ind !== id);
    setAdd(updatedList);
  };

  const editbtn = (id) => {
    const { title, description } = add[id];
    setTitle(title);
    setDescription(description);
    setEditIndex(id);
  };

  const AllRemove = () => {
    setAdd([]);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-8">
      <div className="flex flex-col">
        <div className="main flex justify-center items-center md:flex-row md:justify-center">
          <div className="child bg-white p-4 sm:p-6 rounded shadow-md w-full md:w-96 md:mr-4">
            <figure className="mb-2 sm:mb-4">
              <img
                src="https://images.pexels.com/photos/5797899/pexels-photo-5797899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                width={"100px"}
                height={"100px"}
                alt="logo"
                className="w-16 -mt-4 sm:-mt-10 mb-2 sm:mb-1 h-16 object-cover rounded-full mx-auto"
              />
              <figcaption className="text-center font-bold text-xl sm:text-2xl">Add your List here</figcaption>
            </figure>
            <form onSubmit={addItem}>
              <div className="addItem mb-2 flex justify-center items-center flex-col sm:mb-4">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                  className="border m-2 rounded px-2 py-1 w-full focus:outline-none focus:border-blue-500 transition duration-300"
                />
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description"
                  className="border rounded m-1 px-2 py-1 w-full focus:outline-none focus:border-blue-500 transition duration-300"
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white m-3 -mb-4 px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                >
                  {editIndex === -1 ? "Add" : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="main mt-1 lg:mt-3 sm:mt-8 md:h-full md:-mt-4 flex justify-center items-center">
          <div className="show  p-4 sm:p-6 rounded w-full md:w-1/2">
            {add.map((item, ind) => (
              <div className="eachItem bg-white border rounded px-4 py-2 mb-4" key={ind}>
                <div>
                  <h3 className="text-lg font-semibold">Title:</h3>
                  <p className="mb-2">{item.title}</p>
                  <h3 className="text-lg font-semibold">Description:</h3>
                  <p>{item.description}</p>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => editbtn(ind)}
                    className="bg-blue-500 text-white px-2 py-1 m-1 rounded hover:bg-blue-600 transition duration-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deletebtn(ind)}
                    className="bg-red-500 text-white px-2 py-1 m-1 rounded hover:bg-red-600 transition duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            <div className="flex justify-center mt-4 sm:mt-8 ">
              {add.length > 0 && (
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
                  data-sm-link-text="Remove All"
                  onClick={AllRemove}
                >
                  Remove All
                </button>
              )}
            </div>
          </div>
        </div>
        {error && (
          <div className="error-message fixed top-4 right-4 bg-red-200 text-white px-4 py-2 rounded">
            {error}
            <button onClick={closeError} className="ml-2 bg-red-600 p-1 rounded">
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
