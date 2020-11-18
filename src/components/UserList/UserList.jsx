import React from 'react'
//import component
import Searchbar from '../Searchbar/Searchbar'

const UserList = ({users, searchQuery, removeUser}) => {

    return(
        
        <>
            <Searchbar searchQuery={searchQuery} />
            <ul className='UserList'>
            {users.map((item) => {
                    return(
                        <li className="UserList-Wrapper" key={item.id}>
                            <div className="UserList-Avatar">
                                <img src={item.gender === 'Male' ? './man.png' : './woman.png'} alt="" className="UserList-Photo"/>
                            </div>
                            <div className="UserList-Info">
                                <div className="UserList-About">
                                    <div className="UserList-Details">
                                        <div className="UserList-Name">
                                            {item.name}
                                        </div>
                                        <div className="UserList-Gender">
                                            {item.gender}
                                        </div>
                                    </div>
                                    <div className="UserList-Card">
                                        {item.creditCard.substring(0,2)}******{item.creditCard.substring(0,4)}
                                        <span className='UserList-Credit'>Credit Card</span>
                                    </div>
                                </div>

                                <div className="UserList-Descr">
                                    <div className="UserList-Registration">
                                        {item.registrationTime}
                                        <span className='UserList-Date'>Registration date</span>
                                    </div>
                                    <div className={item.loyaltyProgram ? 'UserList-Loyalty UserList-Loyalty_active' : "UserList-Loyalty"}>
                                        Loyalty
                                    </div>
                                    <div className="UserList-Coupone">
                                        {item.loyaltyCode}
                                        <span className='UserList-Code'>Coupone code</span>
                                    </div>
                                    
                                </div>
                                <button className="UserList-Remove" onClick={()=>{removeUser(item.id)}}><img className="UserList-Trash" src="./delete.png" alt="delete"/></button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </>
    )
};

export default UserList;