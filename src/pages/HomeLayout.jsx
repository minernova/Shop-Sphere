import React from 'react'
import { Outlet, useNavigation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Loading from '../components/Loading';
import Header from '../components/Header';

export default function HomeLayout() {
  const navigation=useNavigation();
  return (
    <div>
      <Header/>
      <Navbar/>
      <section className='align-element py-20'>
        {navigation.state==='loading'?<Loading/>:<Outlet/>}
      </section>
    </div>
  )
}
