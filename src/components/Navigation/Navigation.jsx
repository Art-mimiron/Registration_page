import React from 'react'
import {NavLink} from "react-router-dom";

export default function Navigation() {
    return (
        <ul className='Navigation'>
              <li className='Navigation-Link'>
                <NavLink to="/" className='Navigation-Text'>
                  <img className='Navigation-Img' src="./add_user.png" alt=""/>
                  <span>ADD</span>
                </NavLink>
              </li>
              <li className='Navigation-Link' >
                <NavLink to="/UserList" className='Navigation-Text'>
                  <img className='Navigation-Img' src="./user_list.png" alt=""/>
                  <span>LIST</span>
                </NavLink>
              </li>
              <li className='Navigation-Link'>
                <NavLink to="/About" className='Navigation-Text'>
                  <img className='Navigation-Img' src="./about.png" alt=""/>
                  <span>ABOUT</span>
                </NavLink>
              </li>
        </ul>
    )
}