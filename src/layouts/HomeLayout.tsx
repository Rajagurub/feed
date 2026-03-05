import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import React from 'react';
const HomeLayout=()=>{
    return (
        <React.Fragment>
              <Header/> 
               <Outlet/>
       
     
        </React.Fragment>
    )
}
export default HomeLayout;