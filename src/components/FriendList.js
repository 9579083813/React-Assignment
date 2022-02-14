import React from "react";
import './FriendList.css'
const FriendList = (props) =>{

   const deleteHandler = (item) => {
        props.deleteFriend(item)
   }

   const favouriteHandler = (item)=>{
        props.favouriteFriend(item)
   }
   
    return(
        <div>
            {
                props.friendList.map((item) =>{
                    return(
                    <div key={item.id} >
                    <div className="list">
                       <span > <b>{item.name}</b></span>
                       <span className="btns">
                       {!item.favourite && ( <span className="not-favourite"  onClick={() => favouriteHandler(item)}><i className="bi bi-star"></i></span>)}
                       {item.favourite && ( <span className="favourite"  onClick={() => favouriteHandler(item)}><i className="bi bi-star-fill"></i></span>)}
                       <span className="delete-btn" onClick={() => deleteHandler(item)}><i className="bi bi-trash3"></i></span>
                       </span>
                    </div>
                    <label className="label-font">is your friend</label>
                    <hr/>
                    </div>
                    )
                })
            }
            
        </div>
    )

}

export default FriendList;