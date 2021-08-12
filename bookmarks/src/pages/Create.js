import React, { useState, useEffect } from 'react';

export default function Create(props) {
  const [createdBookmark, setCreatedBookmark] = useState([]);

  const handleSubmit = async e => {
    e.preventDefault();
    try{
      const response = await fetch('/api/bookmarks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(createdBookmark)
      });
    } catch(error) {
      console.error(error)
    }
  };

  const handleChange = e => {
    setCreatedBookmark({...createdBookmark, [e.target.id]: e.target.value})
  };

return (
  <div className="CreatePage">
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        id="name"
        value={createdBookmark.name}
        onChange={handleChange}
      />
      <input
        type="text"
        id="link"
        value={createdBookmark.link}
        onChange={handleChange}
      />
      <input type="submit" value="Submit" />
    </form>

  </div>
)






}
