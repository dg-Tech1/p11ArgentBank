import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserName } from '../../store/store.action';
import './edit.css';

const Edit = ({ setIsEditing }) => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.user.userProfile);
  const [newUserName, setNewUserName] = useState('');

  const handleUpdateUserName = () => {
    if (newUserName) {
      dispatch(updateUserName(newUserName));
      resetForm();
    }
  };

  const handleCancel = () => {
    resetForm();
  };

  const resetForm = () => {
    setIsEditing(false);
    setNewUserName('');
  };

  const renderInput = (id, value, onChange, disabled = false, placeholder = '') => (
    <div>
      <label htmlFor={id}>{id} :</label>
      <input
        type="text"
        id={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
      />
    </div>
  );

  return (
    <div className="edit-form">
      <h2>Edit User Name</h2>
      {renderInput("newUserName", newUserName, (e) => setNewUserName(e.target.value), false, "Enter New Username")}
      {renderInput("firstName", userProfile.firstName, null, true)}
      {renderInput("lastName", userProfile.lastName, null, true)}
      <div className="buttons-form">
        <button onClick={handleUpdateUserName}>Save</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default Edit;
