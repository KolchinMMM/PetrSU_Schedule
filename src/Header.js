import React from 'react'
import './Header.css'

const Header = ({ toggleMenu }) => {
  return (
    <header className='Header'>
      <div style={{marginLeft: 12}}>Расписание ПетрГУ</div>
      <div className="SandwichMenu" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </header>
  )
}


export default Header