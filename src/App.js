import React, { useState, useEffect, Fragment } from 'react';
import AddUserForm from './forms/AddUserForm';
import EditUserForm from './forms/EditUserForm';
import UserTable from './tables/UserTable';

const App = () => {
  // Data
  const usersData = [
    { id: 1, name: 'User1', isOnline: true },
    { id: 2, name: 'User2', isOnline: false },
    { id: 3, name: 'User3', isOnline: true },
  ];

  // Setting state
  const [users, setUsers] = useState(usersData);
  const [currentUser, setCurrentUser] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    console.log('App useEffect');
    if (currentUser) {
      const myInterval = setInterval(() => {
        const newUser = { ...currentUser, isOnline: !currentUser.isOnline };
        setCurrentUser(newUser);
        setUsers(
          users.map(user => (user.id === currentUser.id ? newUser : user)),
        );
      }, 2000);
      return () => {
        console.log('-- App clean up ');
        clearInterval(myInterval);
      };
    }
  }, [currentUser]);

  // CRUD operations
  const addUser = user => {
    user.id = new Date().getUTCMilliseconds();
    // user.id = users.length + 1;
    setUsers([...users, user]);
  };

  const deleteUser = id => {
    setEditing(false);

    setUsers(users.filter(user => user.id !== id));
  };

  const updateUser = (id, updatedUser) => {
    setEditing(false);

    setUsers(users.map(user => (user.id === id ? updatedUser : user)));
  };

  const editRow = user => {
    console.group('user ', user);
    setEditing(true);

    setCurrentUser(user);
  };
  console.log('users ', users);

  return (
    <div className="container">
      <h1>CRUD App with Hooks</h1>
      <div className="flex-row">
        <div className="flex-large">
          {editing ? (
            <Fragment>
              <h2>Edit user</h2>
              <EditUserForm
                editing={editing}
                setEditing={setEditing}
                currentUser={currentUser}
                updateUser={updateUser}
              />
            </Fragment>
          ) : (
            <Fragment>
              <h2>Add user</h2>
              <AddUserForm addUser={addUser} />
            </Fragment>
          )}
        </div>
        <div className="flex-large">
          <h2>View users</h2>
          <UserTable users={users} editRow={editRow} deleteUser={deleteUser} />
        </div>
      </div>
      {currentUser ? (
        <div className="center flex-large">
          <h4>Current User</h4>
          <h5>{currentUser.name}</h5>
          <h5>{currentUser.isOnline ? 'Online ' : 'Offline'}</h5>
        </div>
      ) : null}
    </div>
  );
};

export default App;
