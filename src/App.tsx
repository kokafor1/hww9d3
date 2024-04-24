import { Routes, Route } from 'react-router-dom';
import Questions from './views/Questions';
import Navigation from './components/Navigation';
import Home from './Home';
import AlertMessage from './components/AlertMessage';
import SignUp from './views/SignUp';
import QuestionEdit from './views/QuestionEdit';
import { CategoryType, UserType } from './types';
import { useEffect, useState } from 'react';
import Login from './views/Login';
import Container from 'react-bootstrap/Container';


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(localStorage.getItem('token') ? true : false)
  const [message, setMessage] = useState<string|undefined>(undefined)
  const [category, setCategory] = useState<CategoryType|undefined>(undefined)
  const [currentUser, setCurrentUser] = useState<Partial<UserType>>({
    email: "",
    first_name: "",
    last_name: "",
    token: "",
    user_id: NaN
});

useEffect(() => {
  console.log('inside App use effect');
  function getLoggedInUser() {
      if (isLoggedIn) {
          setCurrentUser({
              email: localStorage.getItem('email')!,
              first_name: localStorage.getItem('first_name')!,
              last_name: localStorage.getItem('last_name')!,
              token: localStorage.getItem('token')!,
              user_id: parseInt(localStorage.getItem('user_id')!),
          })
      }
  }
  getLoggedInUser();
},[isLoggedIn])

const setUser = (user: UserType) => {
  setCurrentUser(user);
  logUserIn()
};

const logUserIn = () => {
  setIsLoggedIn(true)
}

const flashMessage = (newMessage:string|undefined, newCategory:CategoryType|undefined) => {
  setMessage(newMessage);
  setCategory(newCategory);
}
  
const logUserOut = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('email')
  localStorage.removeItem('first_name')
  localStorage.removeItem('last_name')
  localStorage.removeItem('user_id')
  setIsLoggedIn(false)
  setCurrentUser({
      admin: null,
      created_on: "",
      email: "",
      first_name: "",
      last_name: "",
      token: "",
      modified_on: "",
      user_id: NaN,
  })
}
  return (
    <>
    <Navigation isLoggedIn={isLoggedIn} logUserOut={logUserOut} />
    <Container>
    {message && <AlertMessage message={message} category={category} flashMessage={flashMessage} />}
    <div>
      <h1>Come Quiz wit me</h1>
    </div>
    <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/questions" element={<Questions />} />
          <Route path='/signup' element={<SignUp flashMessage={flashMessage}/> } />
          <Route path='/login' element={<Login setUser={setUser}/>} />
          <Route path='/questionedit' element={<QuestionEdit currentUser={currentUser} flashMessage={flashMessage} />} />
    </Routes>
    </Container>
    </>
  );
};

