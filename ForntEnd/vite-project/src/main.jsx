// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import { Route, RouterProvider, createBrowserRouter,createRoutesFromElements } from 'react-router-dom'
//

import Home from '../components/home.jsx';
import SubCategory from '../components/sub_category.jsx';
import Categories from '../components/categories.jsx';
import Products from '../components/Products.jsx';
import RegisterUser from '../components/register.user.jsx';
import LogInUser from '../components/login.user.jsx';
import CodeVerify from '../components/verfyCode.user.jsx';
//

import CheckOut from '../components/checkOut/checkOutBtn.jsx';
import CartBtn from '../components/cart_section/checkOutCart.jsx';
// import Header from '../components/header.jsx'

import PrivateVideo from '../components/PremiumVideos/premiumVideoMain.jsx';
import PlayVideo from '../components/PremiumVideos/videoPlayHere.jsx';



const router = createBrowserRouter(
  
  createRoutesFromElements(
      <Route path='/' element={<App />}>
        <Route path='' element={<Home />} />
        <Route path='/products/:id' element= {<Products /> }/>
        <Route path='/categories' element= {<Categories />}/>
        <Route path='/sub-categories' element = {<SubCategory /> } />
        <Route path='/registeration' element= {<RegisterUser />}/>
        <Route path='/login' element= {<LogInUser />}/>
        <Route path='/code' element= {<CodeVerify />}/>
        <Route path='/cart' element= {<CartBtn />}/>
        <Route path='/CheckOut' element= {<CheckOut />}/>
        <Route path='/premiumVideo' element={<PrivateVideo />} />
        <Route path='/primeVideos/:videoName' element={<PlayVideo />} />
      </Route>
    )
  
)

ReactDOM.createRoot(document.getElementById('root')).render(
    
  < RouterProvider  router= {router} />

)