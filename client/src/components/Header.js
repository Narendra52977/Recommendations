import React from 'react'
import { Link } from 'react-router-dom'
export default function Header() {
  return (
    <header>
        <nav>
            <Link to='/user/register'>Register user</Link>
            <Link to='/recommendation'>Add Recommendation</Link>
            <Link to='/recommendations'>Show Recommendations</Link>
        </nav>
    </header>
  )
}
