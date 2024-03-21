import React from 'react'
import Input from '../Input/Input'
import Personalization from '../Personalization/Personalization'

const Navbar = () => {
  return (
    <div className='p-10 bg-slate-800 flex lg:justify-between flex-col lg:flex-row'>
      <div className='text-6xl text-white font-bold'>The News</div>
      <div>
        <Input />
        <Personalization />
      </div>
    </div>
  )
}

export default Navbar