import React from "react";

const Pagination = (props) =>{
    

    const prevHandler = ()=>{
         const pageNum = props.currentPage === 1 ? 1 : props.currentPage-1;
         props.manageCurrentPage(pageNum)
    }
    const nextHandler =()=>{
        props.manageCurrentPage(props.currentPage+1)
    }
    return(
        <div>
            <button className="prevButton" onClick={prevHandler} disabled={props.disabledPrev}>Prev</button>
            <button onClick={nextHandler} disabled={props.disabledNext}>Next</button>
        </div>
    )
}

export default Pagination