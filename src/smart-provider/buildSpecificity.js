import get from 'lodash.get';
import debugGenerator from './debug-generator';

export default function buildSpecificity({ previousPath, currentType, currentId, debugInstance, config }) {
  debugGenerator(`---- Building specificity: Trying ${ previousPath } ${ currentType } ${ currentId } ----`, debugInstance);
  const previousPathAsArray = previousPath.split('.');
  const previousPathMinusOne = previousPathAsArray.splice(0, previousPathAsArray.length - 1).join('.');
  let previousPathThisPath =
    get(config, `${ previousPath }.${ currentType }.${ currentId }`) && `${ previousPath }.${ currentType }.${ currentId }` ||
    get(config, `${ previousPath }.${ currentType }`) && `${ previousPath }.${ currentType }`;
  if (previousPathMinusOne === "" && !previousPathThisPath) {
    previousPathThisPath = null;
  } else if (!previousPathThisPath) {
    debugGenerator(`No match: Could not match ${ previousPath }.${ currentType }.${ currentId } or ${ previousPath }.${ currentType }. Downgrading previous path from ${ previousPath } to ${ previousPathMinusOne }`, debugInstance);
    previousPathThisPath = this.buildSpecificity({ previousPath: previousPathMinusOne, currentType, currentId })
  }
  debugGenerator(`---- Matched component on: ${ previousPathThisPath } ----`, debugInstance);
  return previousPathThisPath;
}
