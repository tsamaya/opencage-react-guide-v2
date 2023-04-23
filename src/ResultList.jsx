import React from 'react';

function ResultList(props) {
  const rate = props.response.rate || {};
  const results = props.response.results || [];

  return (
    <article className="message">
      <div className="message-body">
        <p>
          Remaining {rate.remaining} out of {rate.limit} requests
        </p>
        <p>&nbsp;</p>
        <ol>
          {results.map((result, index) => {
            return (
              <li key={index}>
                {result.annotations.flag} {result.formatted}
                <br />
                <code>
                  {result.geometry.lat} {result.geometry.lng}
                </code>
              </li>
            );
          })}
        </ol>
      </div>
    </article>
  );
}

export default ResultList;
