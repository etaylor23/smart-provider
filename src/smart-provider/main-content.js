import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';
import classnames from 'classnames';
import { connect } from 'react-redux';
// import { NthSidebarAd } from './adverts';

function MainContentLayout({
  children,
  levelConfiguration,
} = {}) {
  const contentType = get(levelConfiguration, 'contentType');
  const modifier = get(levelConfiguration, 'modifier');
  return (
      <div className={`${ contentType }-container ${ modifier }`}>
        <div className={`${ contentType }-inner-container ${ modifier }`}>
          {children}
        </div>
      </div>
  );
}

if (process.env.NODE_ENV !== 'production') {
  MainContentLayout.propTypes = {
    className: PropTypes.string,
    hideAd: PropTypes.bool,
    children: PropTypes.node.isRequired,
    adTag: PropTypes.string,
  };
}

const MainContent = connect((state, ownProps) => {
  return {
  configuration: state.configuration,
}})(MainContentLayout);

export default MainContent;
