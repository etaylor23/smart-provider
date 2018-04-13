import React from 'react';
import get from 'lodash.get';

export default function buildChildren(multiple, config) {
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
          levelConfiguration: get(config, `${componentsRetreived.typeConstruct}.levelConfiguration`),
        },
        nested ? buildChildren(nested) : null,
      )
    }
  });
}
