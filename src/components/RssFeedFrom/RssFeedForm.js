import React, { useState, useRef } from "react";
import Pagination from "../Pagination/Pagination";
import "./RssFeedForm.css";
const RssFeedForm = () => {
  //Get feedData
  const [feedData, setFeedData] = useState(null);
  // sets error message if any
  const [error, setError] = useState(null);
  // shows loading icon while waiting for feedback from Rss feed
  const [loading, setLoading] = useState(false);

  // RSS parser NPM module
  let Parser = require("rss-parser");
  let parser = new Parser();

  // Get value of feed given in input box from user using ref
  const inputEl = useRef(null);

  const handClick = (e) => {
    e.preventDefault();
    // Fetch RSS data in async func
    fetchRssFeedData();
  };

  const fetchRssFeedData = async () => {
    //empty error for each fresh call
    setError(null);
    //empty feedData for each fresh call
    setFeedData(null);
    // start loading
    setLoading(true);
    // await make sure next line of code is not exccuted till we get parsed RSS feed value
    try {
      const feed = await parser.parseURL(inputEl.current.value);
      setFeedData(feed);
      //stop loading
      setLoading(false);
    } catch (err) {
      setError(err.message);
    }
  };

  //https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml

  return (
    <React.Fragment>
      <form>
        <input type="text" ref={inputEl} placeholder="Enter RSS feed"></input>
        <br />
        <br />
        <button onClick={handClick}>Submit</button>
      </form>
      {loading && <div id="loader"></div>}

      <Pagination feedData={feedData}></Pagination>
      <div id="error">{error}</div>
    </React.Fragment>
  );
};

export default RssFeedForm;
