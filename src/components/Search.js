import React, { useEffect, useRef, useState } from "react"
import FriendList from "./FriendList";
import Pagination from "./Pagination";

const perPage = 4;
const defaultList = [{
    "name":"Ganesh",
    "favourite":true,
    "id":1
},
{
    "name":"Harshal",
    "favourite":false,
    "id":2
},
{
    "name":"Johan",
    "favourite":false,
    "id":3
},
{
    "name":"Alis",
    "favourite":true,
    "id":4
}]
const SearchBox = () =>{
    const inputRef =  useRef(null)
    const [copyFriendList, setCopyFriendList] = useState([]);
    const [friendList, setFriendList] = useState(defaultList);
    const [currentPage, setCurrentPage] = useState(1);
    const [disabledPrev, setDisabledPrev] = useState(true);
    const [disabledNext, setDisabledNext] = useState(true);
    useEffect(()=>{
        let arrayCopy = [...friendList]
        if(friendList.length <= perPage){
            setCopyFriendList(friendList);
        }
        if(friendList.length > (perPage*currentPage)){
            setDisabledNext(false)
        }else{
            setDisabledNext(true)
        }
        if(currentPage > 1){
            setDisabledPrev(false);
        }else if(currentPage <= 1){
            setDisabledPrev(true);
        }
        if(currentPage*perPage > friendList.length){
            let lastPage=(currentPage*perPage)-perPage;
            let spliceArray = arrayCopy.splice(lastPage);
            setCopyFriendList(spliceArray);
        }else{
            let middlePage = (currentPage*perPage)-perPage;
            let spliceMiddleArray = arrayCopy.splice(middlePage,perPage);
            setCopyFriendList(spliceMiddleArray);
        }
    },[currentPage,friendList])


    const manageCurrentPage = (pageNumber)=>{
        setCurrentPage(pageNumber)
    }

    const handleChnage = (event) =>{
        const name = inputRef.current.value
        if(name && event.keyCode === 13){
           let arr =[...friendList];
           
           arr.unshift({
              id:Math.random(),
              name,
              favourite:false
           })
            setFriendList(arr);
            inputRef.current.value = '';
        }
        
    }

    const deleteFriend = (item) =>{
        let arr =[...friendList];
        var result = window.confirm("Are you sure you wish to delete your friend?");
        if (result) {
        const index =  arr.findIndex((data) => {
            return data.id === item.id;
        });

        arr.splice(index,1);
        setFriendList(arr);
        }   
      
    }

    const favouriteFriend = (item)=>{
        let arr =[...friendList];
           
        const index =  arr.findIndex((data) => {
             return data.id === item.id;
         });

        const Isfavourite = arr[index].favourite;
 
          arr[index].favourite = !Isfavourite;
          setFriendList(arr);
    }

    const sortFavourite = ()=>{
        let data = [...friendList];
        data.sort((a,b)=> (b.favourite) - (a.favourite));
        setFriendList(data);
    }
    
    return (
        <>
        <div className="align-left">
            <h5 className="header">Friends List
            <button className="sort-btn" onClick={sortFavourite}>Sort</button>
            </h5>
        </div>
        <div className="align-left">
            <input type="text" onKeyUp={handleChnage} ref={inputRef} placeholder="Enter your friend's name"/>
            <FriendList friendList={copyFriendList}
                        deleteFriend={deleteFriend} 
                        favouriteFriend={favouriteFriend}/>
                         <Pagination friendsLength={friendList.length}
                                     currentPage={currentPage}
                                     manageCurrentPage={manageCurrentPage}
                                     disabledPrev={disabledPrev} 
                                     disabledNext={disabledNext}   />
        </div>
        </>
    )

}

export default SearchBox;