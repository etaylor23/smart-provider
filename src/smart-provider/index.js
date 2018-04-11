import React from 'react';
import { connect } from 'react-redux';
import pageInformation, {
  addPageInformation,
} from '../reducers/page-information';
// import { TestArticle } from './test-components/test-article';
// import { TestListRedux } from './test-components/test-list';
import get from 'lodash.get';
// import { TestListItemRedux } from './test-components/item';
// import { dataManipulator } from './data-manipulator';
import { articleConfig } from '../config/article';
import MainContent from './main-content';
import lodash from 'lodash';

const potentialMultipleNodes = ['hasPart.parts', 'articleSection.internal', 'isPartOf'];

export class SmartProvider extends React.Component {
  storeData(pageInformation) {
    // Update redux store if it hasn't already been updated
    let pageInfo = {};
    if (Object.keys(this.props.pageInformation).length === 0) {
      const manipulatedData = this.props.data.canonical;
      // Use the data manipulator to test out different scenarios
      pageInfo = this.props.addPageInformation(manipulatedData);
    }
    // Assign the redux store or the initial payload
    return pageInfo.payload || this.props.pageInformation;
  }

  getMultiples(data, instantAccessKey, accessKey, typeConstruct) {
    let finalKey = accessKey && `${accessKey}.${instantAccessKey}` || instantAccessKey;
    const nestedParts = get(data, instantAccessKey);
    if (!nestedParts) {
      return null;
    }
    const nestedComponents = nestedParts.map((part, index) => {
      let finalTypeConstruct = typeConstruct[0] && `${ typeConstruct[0] }.${part.tegType}` || part.tegType;
      let finalIdConstruct = typeConstruct[1] && `${ typeConstruct[1] }.${part.tegID}` || part.tegID;
      const nested = potentialMultipleNodes.filter((multipleNode) => {
        return get(part, multipleNode);
      });
      const allNested = nested.map((certifiedNested) => {
        return get(part, certifiedNested) ? this.getMultiples(
          part,
          certifiedNested,
          `${finalKey}[${index}]`,
          [ finalTypeConstruct, finalIdConstruct ]
        ): null;
      })[0]
      const component = this.getComponent(
        part,
        `${finalKey}[${index}]`,
        [ finalTypeConstruct, finalIdConstruct ]
      );
      const out = [
        component,
      ];
      if (allNested && allNested.length > 0) {
        out.push(allNested);
      }
      return out;
    })
    .filter((nestedComponent) => nestedComponent[0]);
    return nestedComponents;
  }

  buildSpecificity({ previousPath, currentType, currentId }) {
    this.debugGenerator(`---- Building specificity: Trying ${ previousPath } ${ currentType } ${ currentId } ----`);
    const previousPathAsArray = previousPath.split('.');
    const previousPathMinusOne = previousPathAsArray.splice(0, previousPathAsArray.length - 1).join('.');
    let previousPathThisPath =
      get(articleConfig, `${ previousPath }.${ currentType }.${ currentId }`) && `${ previousPath }.${ currentType }.${ currentId }` ||
      get(articleConfig, `${ previousPath }.${ currentType }`) && `${ previousPath }.${ currentType }`;
    if (previousPathMinusOne === "" && !previousPathThisPath) {
      previousPathThisPath = null;
    } else if (!previousPathThisPath) {
      this.debugGenerator(`No match: Could not match ${ previousPath }.${ currentType }.${ currentId } or ${ previousPath }.${ currentType }. Downgrading previous path from ${ previousPath } to ${ previousPathMinusOne }`);
      previousPathThisPath = this.buildSpecificity({ previousPath: previousPathMinusOne, currentType, currentId })
    }
    this.debugGenerator(`---- Matched component on: ${ previousPathThisPath } ----`);
    return previousPathThisPath;
  }

  interpolateFields(type, id, count, config, previousPath) {
    if (previousPath === null) {
      return null;
    }
    let counter = count || 0;
    let componentMatched = null;
    const currentType = type[counter];
    const currentId = id[counter];
    if (previousPath) {
      let finalSpecificty = this.buildSpecificity({
        previousPath,
        currentType,
        currentId
      });
      if (counter < (type.length - 1)) {
        finalSpecificty = this.interpolateFields(type, id, counter+1, config, finalSpecificty)
      }
      if (!get(config, finalSpecificty)) {
        finalSpecificty = this.interpolateFields(type, id, counter+1, config, finalSpecificty)
      }

      return finalSpecificty;
    }

    const typeIdCombo = `${ currentType }.${ currentId }`;
    const currentCombo = get(config, typeIdCombo) ? typeIdCombo : type[counter];
    componentMatched = currentCombo;
    if (counter < (type.length - 1)) {
      componentMatched = this.interpolateFields(type, id, counter+1, config, currentCombo)
    }
    const finalComponent = get(config, componentMatched)
    if (!finalComponent) {
      return null;
    }
    return Object.assign(finalComponent, {
      configurationPath: componentMatched,
    });
  }

  debugGenerator(info) {
    return this.debug.push(info);
  }

  matchComponent(config, typeConstruct) {
    const type = typeConstruct[0].split('.');
    const id = get(typeConstruct, '[1]') && typeConstruct[1].split('.');
    const componentMatched = this.interpolateFields(type, id, null, config);
    this.debugGenerator(componentMatched ? `Component matched on ${ componentMatched.configurationPath}` : `Could not match component on ${ type }`);
    return componentMatched;
  }

  getComponent(data, accessPath, typeConstruct) {
    this.debug = [];
    const config = articleConfig;
    const matchedComponent = this.matchComponent(config, typeConstruct);
    let finalComponent = null;
    if (matchedComponent) {
      const { component, levelConfiguration, configurationPath } = matchedComponent;
      finalComponent = {
        component,
        levelConfiguration,
        accessPath,
        typeConstruct: configurationPath,
      }
    }
    console.log('Debug log', this.debug);
    return finalComponent;
  }

  buildChildren(multiple) {
    return multiple.map((part) => {
      let componentsRetreived = part[0];
      let nested = part[1];
      if (Array.isArray(componentsRetreived.component)) {
        const componentSet = componentsRetreived.component.map((componentRetreived) => {
          let isComplexComponent = typeof componentRetreived === 'object';
          return React.createElement(
            isComplexComponent ? componentRetreived.component : componentRetreived,
            {
              accessPath: componentsRetreived.accessPath,
              typeConstruct: componentsRetreived.typeConstruct,
              customProps: isComplexComponent ? componentRetreived.customProps : null,
              levelConfiguration: componentsRetreived.levelConfiguration,
            },
            null,
          )
        })
        const componentContent = React.createElement(
          'div',
          {
            ref: (element) => {
              if (element) {
                return element.className = `main-content__${ componentsRetreived.levelConfiguration.contentType } main-content__main-column blog-post--template-article`
              }
            }
          },
          [componentSet],
        );
        const mainContent = React.createElement(
          'div',
          {
            ref: (element) => {
              if (element) {
                return element.className = `main-content`
              }
            }
          },
          [componentContent],
        )
        return React.createElement(
          'div',
          {
            ref: (element) => {
              if (element) {
                return element.className = `main-content__clearfix`
              }
            }
          },
          [mainContent],
        )
      } else {
        return React.createElement(
          componentsRetreived.component,
          {
            accessPath: componentsRetreived.accessPath,
            typeConstruct: componentsRetreived.typeConstruct,
            levelConfiguration: get(articleConfig, `${componentsRetreived.typeConstruct}.levelConfiguration`),
          },
          nested ? this.buildChildren(nested) : null,
        )
      }
    });
  }

  buildMultiples(multiples) {
    return multiples.map((multiple) => this.buildChildren(multiple));
  }

  render() {
    let {
      pageInformation,
    } = this.props;
    // Store the data
    let data = this.storeData(pageInformation);

    // Generate and build the top level component
    let Component = this.buildChildren([
      [
        this.getComponent(
          data,
          null,
          [ data.tegType, data.tegID ]
        )
      ]
    ]);

    // Generate the components for any multiples data, like hasPart or isPartOf
    const multiples = potentialMultipleNodes
      .map((multipleNode) => this.getMultiples(
          data,
          multipleNode,
          null,
          [ data.tegType, data.tegID]
        )
      )
      .filter((notNullMultipleNode) => notNullMultipleNode !== null)

    // Build the components for all of the multiples
    let Children = this.buildMultiples(multiples);

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

export const SmartProviderRedux = connect(
  (state) => ({
    pageInformation: state.pageInformation,
  }),
  {
    addPageInformation,
  }
)(SmartProvider);
