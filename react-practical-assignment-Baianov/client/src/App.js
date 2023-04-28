import {useEffect} from 'react';
import './App.css';
import Home from "./Pages/Home";
import {useSelector} from "react-redux";
import LoginPage from "./Pages/LoginPage";

function App() {
  const MAIN_URL = 'http://localhost:8080/post/';

  useEffect(async () => {
    // TEST API, it might be removed
    // fetch('http://localhost:8080/live').then(res => res.json()).then(res => {
    //   console.log('API CONNECTION IS OK');
    // }).catch((e) => console.error('API CONNECTION FAILED, PLEASE CHECK SERVER APP AND TRY AGAIN'))

    // let post = {
    //   title: 'Once you start down the dark path, forever will it dominate your destiny.', username: 'Yoda'
    // };
    //
    // let response = await fetch(MAIN_URL, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json;charset=utf-8'
    //   },
    //   body: JSON.stringify(post)
    // });
    //
    // let result = await response.json();
    // console.log(result.message);

    // fetch(MAIN_URL+`page/1`).then(responce=> responce.json()).then(data=> console.log(data.result));
  }, []);

  const login = useSelector(state => state.loginPage)

  return (
    <div className="wrapper">
      {login.login ? <Home/> : <LoginPage/> }
    </div>
  );
}

export default App;
