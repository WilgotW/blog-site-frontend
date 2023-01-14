import React from 'react'
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1>BlogIT</h1>
      <h3>BlogIT is a website that lets you create blogs manly focusing on IT blogs. Here you can post about your ideas, progress and IT projects!</h3>
      <Link to="/login" >Hello</Link>
    </div>
  )
}
