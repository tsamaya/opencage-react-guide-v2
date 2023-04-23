import React, { useState } from 'react'
import Header from './Header'
import GeocodingForm from './GeocodingForm';
import GeocodingResults from './GeocodingResults';

import * as opencage from 'opencage-api-client';

function App() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [response, setResponse] = useState({});
  return (
    <div>
      <Header />
      <div className="columns">
      <div className="column is-one-third-desktop">
            <GeocodingForm
            isSubmitting={isSubmitting}
            onSubmit={(apikey, query)=> {
              setIsSubmitting(true);
              console.log(apikey, query);
              opencage
              .geocode({ key: apikey, q: query })
              .then(response => {
                console.log(response);
                setResponse(response);
              })
              .catch((err) => {
                console.error(err);
                setResponse({});
              }).finally(()=>{
                setIsSubmitting(false);
              });
        
            }}
            />
          </div>
          <div className="column">
            <GeocodingResults response={response} />
          </div>
      </div>
    </div>
  )
}

export default App
