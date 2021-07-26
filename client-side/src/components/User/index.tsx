import React, { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';

const User = () => {
  const [userInput, setUserInput] = useState('');
  const history = useHistory();

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    history.push('/chat', { name: userInput });
  };

  return (
    <form onSubmit={(e) => submitHandler(e)}>
      <input onChange={(e) => setUserInput(e.target.value)} value={userInput} />
      <button type="submit" aria-label="Join Chat!" />
    </form>
  );
};

export default User;
