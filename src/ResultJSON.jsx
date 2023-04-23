import React, { Component } from 'react';

import './ResultJSON.css';

function ResultJSON(props) {
  return (
    <article className="message">
      <div className="message-body">
        <pre>{JSON.stringify(props.response, null, 2)}</pre>
      </div>
    </article>
  );
}

export default ResultJSON;
