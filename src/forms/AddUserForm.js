import React, { useState } from 'react';

const AddUserForm = props => {
  const initialFormState = { id: null, name: '', isOnline: true };
  const [user, setUser] = useState(initialFormState);

  const handleInputChange = event => {
    const { name, value } = event.target;
    const newUser = { ...user, [name]: value };
    console.log(' newUser', newUser);
    setUser(newUser);
  };

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        // if (!user.name || !user.username) return;

        props.addUser(user);
        setUser(initialFormState);
      }}
    >
      <label>Name</label>
      <input
        type="text"
        name="name"
        value={user.name}
        onChange={handleInputChange}
      />
      <label>age</label>
      <input
        type="text"
        name="age"
        value={user.age}
        onChange={handleInputChange}
      />
      <button>Add new user</button>
    </form>
  );
};

export default AddUserForm;
