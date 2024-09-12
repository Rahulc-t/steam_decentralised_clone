import React, { useState } from 'react';
import{createBrowserRouter,createRoutesFromElements,RouterProvider,Route} from "react-router-dom"
import Userlayout from './assets/layout/Userlayout';
import Homepage from './assets/pages/Homepage';
import Loginpage from './assets/pages/Loginpage';
import Profilepage from './assets/pages/Profilepage';
import Aboutme from './assets/pages/Aboutme';
import SiginupPage from './assets/pages/SiginupPage';
import AdminPage from './assets/pages/AdminProfile';
import AdminLayout from './assets/layout/AdminLayout';
import AddGame from './assets/pages/AddGame';
import ViewGames from './assets/pages/ViewGames';
import EditGame from './assets/pages/EditGame';
import ViewGame from './assets/pages/BuyGame';

function App() {
  // const [count, setCount] = useState(0);
  const router=createBrowserRouter(createRoutesFromElements( 
    <>
    <Route path="/" element={<Userlayout />} >
      {/* <Route path="/" element={<Homepage/>} /> */}
      <Route path ="/login" element={<Loginpage/>}/>
      <Route path="/profile" element={<Profilepage/>}/>
      <Route path="/aboutme" element={<Aboutme/>}/>
      <Route path="/signup" element={<SiginupPage/>}/>
      <Route path="/store" element={<Homepage/>}/>
      <Route path="/viewgame/:id" element={<ViewGame/>}/>
      </Route>



 <Route path="/" element={<AdminLayout/>}>
  <Route path="/admin" element={<AdminPage/>}/>
  <Route path="/addgame" element={<AddGame/>}/>
  <Route path="/viewgames" element={<ViewGames/>}/>
  <Route path="/editgames/:id" element={<EditGame/>}/>

</Route>

    </>))

  return (
    <>

<RouterProvider router={router}/>

    </>
  );
}

export default App;
