import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <div className='vh-100 d-flex flex-column justify-content-center align-items-center'>
      <h1>Page Not Found</h1>
      <div>
        Go back to home <Link to="/" className='text-decoration-none'>Click here!</Link>
      </div>
    </div>
  )
}

export default PageNotFound