import NavBar from '../../../components/NavBar/NavBar';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ResearchDashboard.less';

export default function ResearchDashboard(props) {
  return (
    <div className='container nav-padding'>
      <NavBar />
      <div id='main-header'>Welcome Researcher!</div>

      <div id='button-container'>
        {/* <div class='parent'>
          <div class='child inline-block-child'>Home</div>
          <div class='child inline-block-child'>Reports</div>
        </div> */}
        <Link to={'/report'}>
          <button
            id={'route-button'}
            className={`btn-${'primary'} btn-${'sm'}`}
            type='button'
          >
            Reports
          </button>
        </Link>
      </div>
    </div>
  );
}
