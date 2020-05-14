import React, { useState, useEffect } from "react";
import RssFeedItems from "../RssFeedItems/RssFeedItems";
import './Pagination.css';
const Pagination = ({ feedData }) => {
  //Get currentPage number
  const [currentPage, setCurrentPage] = useState(1);
  //set Number of items per page
  const [numberofItemsPerPage] = useState(10);
  //Initally set previous button disabled
  const [previousPageDisabled, setPreviousPageDisabled] = useState(true);
  //Initally set Next button active
  const [nextPageDisabled, setNextPageDisabled] = useState(false);

    //hide pagination initally
    const [hide, setHide] = useState('hide');

 useEffect(()=>{
     if(feedData){
         setHide('show')
     }else{
         setHide('hide')
     }
 }, [feedData] )


  let handleNext = () => {
    // for slicing nextPage will store  item on the next page as a starting item from where slicing will begin
    let nextPage = currentPage + numberofItemsPerPage;
    setCurrentPage(nextPage);

    //When we reach at the end of number items, disabled next button
    if (feedData.items.length < nextPage + numberofItemsPerPage) {
      setNextPageDisabled(true);
    }
    // make previous button enabled so user can go back
    setPreviousPageDisabled(false);
  };

  let handlePrevious = () => {
    // for slicing previousPage will store item on the previous page as a starting item from where slicing will begin
    let previousPage = currentPage - numberofItemsPerPage;
    setCurrentPage(previousPage);

    // if we are on first page disable previous button
    if (previousPage === 1) {
      setPreviousPageDisabled(true);
      setNextPageDisabled(false);
    } else {
      // if we are not on first page, mean user can come back to enable previous button
      setPreviousPageDisabled(false);
    }
  };

  return (
    <React.Fragment>
      <div id="pagination" className={hide}>
        <button disabled={nextPageDisabled} onClick={handleNext}>
          {" "}
          Next
        </button>
        <button disabled={previousPageDisabled} onClick={handlePrevious}>
          Previous
        </button>
      </div>
      {feedData &&
        feedData.items
          .slice(currentPage, currentPage + numberofItemsPerPage)
          .map((item) => (
            <RssFeedItems key={item.title} {...item}></RssFeedItems>
          ))}
    </React.Fragment>
  );
};

export default Pagination;
