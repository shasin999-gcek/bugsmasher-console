import React from 'react';
import 'assets/css/maintenance.css';

const Unavailable = (props) => {
  return (
    <div className="maintenance">
      <article>
          <h1>Web app is temporarily unavailable.</h1>
          <p>Scheduled maintenance is currently in progress. Please check back soon.</p>
          <p>We apologize for any inconvenience.</p>
          <p id="signature">&mdash; <a href="mailto:mohdshasin313@gmail.com">Bugsmasher Team</a></p>
      </article>
    </div>
  );
}

export default Unavailable;