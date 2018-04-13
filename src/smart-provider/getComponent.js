import matchComponent from './matchComponent';

export default function getComponent(data, accessPath, typeConstruct, config, debugInstance) {
  const matchedComponent = matchComponent(config, typeConstruct, debugInstance);
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
  console.log('Debug log', debugInstance);
  return finalComponent;
}
