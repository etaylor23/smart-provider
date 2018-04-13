import React from 'react';
import { connect } from 'react-redux';
import get from 'lodash.get';
import pageInformation from '../reducers/page-information';

export class ListBase extends React.Component {
  render() {
    const {
      headline,
      subheadline,
      datePublished,
      description,
    } = this.props.pageInformation;
    const contentType = get(this.props.levelConfiguration, 'contentType');
    const modifier = get(this.props.levelConfiguration, 'modifier');
    const color = get(this.props.levelConfiguration, 'color');
    return (
      <div style={{backgroundColor: color || null}} className={`list-container ${contentType}-container ${modifier}`} itemtype={`http://schema.org/${ contentType }`}>
        <div className={`list-inner-container ${contentType}`}>
          <a>{headline}</a>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export const List = connect(
  (state, ownProps) => ({
    pageInformation: get(ownProps, 'accessPath') ? get(state, `pageInformation.${ownProps.accessPath}`) : state.pageInformation,
  })
)(ListBase);
