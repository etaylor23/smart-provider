import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash.get';

export const SimpleHeaderLayout = ({
  pageInformation
}) => (
  <div className="header-container">
    <div className="header-inner-container">
      <h1>
        {pageInformation.headline}
      </h1>
    </div>
  </div>
);

if (process.env.NODE_ENV !== 'production') {
  SimpleHeaderLayout.propTypes = {
    title: PropTypes.string.isRequired,
  };
}

const SimpleHeader = connect((state, ownProps) => {
    return {
      configuration: state.configuration,
      pageInformation: get(ownProps, 'accessPath') ? get(state, `pageInformation.${ownProps.accessPath}`) : state.pageInformation,
    }
}
)(SimpleHeaderLayout);

export default SimpleHeader;
