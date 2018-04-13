import React from 'react';
import { connect } from 'react-redux';
import pageInformation, {
  addPageInformation,
} from '../reducers/page-information';
import get from 'lodash.get';
import MainContent from './main-content';
import lodash from 'lodash';
import buildChildren from './buildChildren';
import buildMultiples from './buildMultiples';
import debugGenerator from './debug-generator';
import interpolateFields from './interpolateFields';
import getComponent from './getComponent';
import getMultiples from './getMultiples';

export const potentialMultipleNodes = ['hasPart.parts', 'articleSection.internal', 'isPartOf'];

export class SmartProviderBase extends React.Component {
  storeData(pageInformation) {
    // Update redux store if it hasn't already been updated
    let pageInfo = {};
    if (Object.keys(this.props.pageInformation).length === 0) {
      pageInfo = this.props.addPageInformation(this.props.data.canonical);
    }
    // Assign the redux store or the initial payload
    return pageInfo.payload || this.props.pageInformation;
  }

  render() {
    let {
      pageInformation,
    } = this.props;
    // Store the data
    let data = this.storeData(pageInformation);

    // Generate and build the top level component
    this.debug = [];
    let Component = buildChildren([
      [
        getComponent(
          data,
          null,
          [ data.tegType, data.tegID ],
          this.props.config,
          this.debug
        )
      ]
    ], this.props.config);

    // Generate the components for any multiples data, like hasPart or isPartOf
    const multiples = potentialMultipleNodes
      .map((multipleNode) => getMultiples(
          data,
          multipleNode,
          null,
          [ data.tegType, data.tegID],
          this.props.config,
          this.debug
        )
      )
      .filter((notNullMultipleNode) => notNullMultipleNode !== null)

    // Build the components for all of the multiples
    let Children = buildMultiples(multiples);

    // Add the top level component as a child of a container
    Children.unshift(Component);

    // is the main component in fact an array of components?
    const componentOrComponentSet = get(Component, '[0][0]', Component[0]);
    return React.createElement(
      MainContent,
      {
        levelConfiguration: get(componentOrComponentSet, 'props.levelConfiguration'),
      },
      ...Children,
    )
  }
}

const SmartProvider = connect(
  (state) => ({
    pageInformation: state.pageInformation,
  }),
  {
    addPageInformation,
  }
)(SmartProviderBase);

export default SmartProvider;
