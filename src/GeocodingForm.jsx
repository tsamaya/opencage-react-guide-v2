import React, { useState } from 'react';
import './GeocodingForm.css';

function GeocodingForm(props) {
  const [isLocating, setIsLocating] = useState(false);
  const [apikey, setApiKey] = useState('');
  const [query, setQuery] = useState('');

  function handleGeoLocation() {
    const geolocation = navigator.geolocation;
    const p = new Promise((resolve, reject) => {
      if (!geolocation) {
        reject(new Error('Not Supported'));
      }
      setIsLocating(true);

      geolocation.getCurrentPosition(
        (position) => {
          console.log('Location found');
          resolve(position);
        },
        () => {
          console.log('Location : Permission denied');
          reject(new Error('Permission denied'));
        }
      );
    });
    p.then((location) => {
      setIsLocating(false);
      setQuery(location.coords.latitude + ', ' + location.coords.longitude);
    });
  }

  function handleSubmit(event) {
    console.log('Form was submitted with query: ', apikey, query);
    props.onSubmit(apikey, query);
  }

  const { isSubmitting } = props;

  return (
    <div className="box form">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        {/* <!-- API KEY --> */}
        <div className="field">
          <label className="label">API key</label>
          <div className="control has-icons-left">
            <span className="icon is-small is-left">
              <i className="fas fa-lock" />
            </span>
            <input
              name="apikey"
              className="input"
              type="text"
              placeholder="YOUR-API-KEY"
              value={apikey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </div>
          <div className="help">
            Your OpenCage Geocoder API Key (
            <a href="https://opencagedata.com/users/sign_up">register</a>
            ).
          </div>
        </div>
        {/* <!-- ./API KEY --> */}

        {/* <!-- Query --> */}
        <div className="field">
          <label className="label">Address or Coordinates</label>
          <div className="control has-icons-left">
            <span className="icon is-small is-left">
              <i className="fas fa-map-marked-alt" />
            </span>
            <input
              name="query"
              className="input"
              type="text"
              placeholder="location"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="help">
              Address, place name
              <br />
              Coordinates as <code>latitude, longitude</code> or{' '}
              <code>y, x</code>.
            </div>
          </div>
        </div>
        {/* <!-- ./Query --> */}

        <div className="field">
          <label className="label">Show my location</label>
          <div className="control" onClick={handleGeoLocation}>
            {!isLocating && (
              <button className="button is-static">
                <span className="icon is-small">
                  <i className="fas fa-location-arrow" />
                </span>
              </button>
            )}
            {isLocating && (
              <button className="button is-static">
                <span className="icon is-small">
                  <i className="fas fa-spinner fa-pulse" />
                </span>
              </button>
            )}
          </div>
        </div>

        {/* <!-- Button Geocode --> */}
        <button
          className="button is-success"
          onClick={handleSubmit}
          disabled={isLocating || isSubmitting}
        >
          Geocode
        </button>
        {/* <!-- ./Button Geocode --> */}
      </form>
    </div>
  );
}

export default GeocodingForm;
