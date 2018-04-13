import buildSpecificity from './buildSpecificity';
import get from 'lodash.get';

export default function interpolateFields(type, id, count, config, previousPath, debugInstance) {
  if (previousPath === null) {
    return null;
  }
  let counter = count || 0;
  let componentMatched = null;
  const currentType = type[counter];
  const currentId = id[counter];
  if (previousPath) {
    let finalSpecificty = buildSpecificity({
      previousPath,
      currentType,
      currentId,
      debugInstance,
      config,
    });
    if (counter < (type.length - 1)) {
      finalSpecificty = interpolateFields(type, id, counter+1, config, finalSpecificty, debugInstance)
    }
    if (!get(config, finalSpecificty)) {
      finalSpecificty = interpolateFields(type, id, counter+1, config, finalSpecificty, debugInstance)
    }
    return finalSpecificty;
  }

  const typeIdCombo = `${ currentType }.${ currentId }`;
  const currentCombo = get(config, typeIdCombo) ? typeIdCombo : type[counter];
  componentMatched = currentCombo;
  if (counter < (type.length - 1)) {
    componentMatched = interpolateFields(type, id, counter+1, config, currentCombo, debugInstance)
  }
  const finalComponent = get(config, componentMatched)
  if (!finalComponent) {
    return null;
  }
  return Object.assign(finalComponent, {
    configurationPath: componentMatched,
  });
}
