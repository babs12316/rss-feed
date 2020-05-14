import React from 'react';
const RssFeedItems = ({title,link})=> {
    return (
       <div className="item">
        <h1>{title}</h1>
        <a href={link}>{link}</a>
       </div>

      );
}
 
export default RssFeedItems;