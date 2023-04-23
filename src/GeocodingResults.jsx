import React, { useState } from 'react';
import classnames from 'classnames';

import ResultList from './ResultList';
import ResultJSON from './ResultJSON';
import ResultMap from './ResultMap';

import './GeocodingResults.css';

const RESULT_TAB = 'RESULT_TAB';
const MAP_TAB = 'MAP_TAB';
const JSON_TAB = 'JSON_TAB';

function GeocodingResults(props) {
  const [activeTab, setActiveTab] = useState(RESULT_TAB);

  function renderTab(title, tab, icon, activeTab) {
    return (
      <li className={classnames({ 'is-active': activeTab === tab })}>
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab(tab);
          }}
        >
          <span className="icon is-small">
            <i className={icon} aria-hidden="true" />
          </span>
          <span>{title}</span>
        </a>
      </li>
    );
  }

  const results = props.response.results || [];

  return (
    <div className="box results">
      <div className="tabs is-boxed vh">
        <ul>
          {renderTab('Results', RESULT_TAB, 'fas fa-list-ul', activeTab)}
          {results.length > 0 &&
            renderTab('Map', MAP_TAB, 'fas fa-globe-americas', activeTab)}
          {results.length > 0 &&
            renderTab('JSON Result', JSON_TAB, 'fab fa-js', activeTab)}
        </ul>
      </div>

      {/* List of results */}
      {activeTab === RESULT_TAB && results.length > 0 && (
        <ResultList response={props.response} />
      )}
      {/* JSON result */}
      {activeTab === JSON_TAB && results.length > 0 && (
        <ResultJSON response={props.response} />
      )}
      {/* MAP result */}
      {/* {activeTab === MAP_TAB && results.length > 0 && (
        <ResultMap response={props.response} />
      )} */}
    </div>
  );
}

export default GeocodingResults;
