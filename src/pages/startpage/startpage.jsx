import React from 'react'
import { Link } from 'react-router-dom'

const StartPage = () => {
  return (
    <div className='vh-100 d-flex flex-column gap-2 justify-content-center align-items-center bg-primary bg-gradient'>
      <img src='/malaking_logo.png'/>
      <img src='/text.png'/>
      <Link to="/login" className='btn btn-lg w-50 btn-light '>Continue</Link>
    </div>
  )
}

export default StartPage