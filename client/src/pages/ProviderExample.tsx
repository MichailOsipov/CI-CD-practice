import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

type User = {
  name: string;
  age: number;
};

const UserContext = createContext<{
  user: User;
  setUser: (user: User) => void;
}>({ user: { name: '', age: 0 }, setUser: () => { /* */} });

const UserWrapper = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>({ name: 'moo', age: 25 });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

const Moo = () => {
  console.log('moo render');

  return (
    <div>
      Moo
    </div>
  );
};

const FooWrapper = ({ children }: { children: ReactNode }) => {
  console.log('foo-wrapper render');

  return (
    <div>
      {children}
    </div>
  );
};

const FooWrapper2 = ({ children }: { children: ReactNode }) => {
  console.log('foo-wrapper-2 render');

  return (
    <div>
      {children}
    </div>
  );
};

const Foo = () => {
  const { user, setUser } = useContext(UserContext);

  const [username, setUsername] = useState('');

  const saveNewUsername = () => {
    setUser({ age: user.age, name: username });
    setUsername('');
  };

  useEffect(() => {
    console.log('foo render');
  });

  return (
    <div>
      <label htmlFor="username">
        userName:
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </label>
      {JSON.stringify(user)}
      <button type="button" onClick={saveNewUsername}>Save new username</button>
    </div>
  );
};

export const ProviderExample = () => {
  return (
    <UserWrapper>
      <Moo />
      <FooWrapper>
        <FooWrapper2>
          <Foo />
        </FooWrapper2>
      </FooWrapper>
    </UserWrapper>
  );
};
