import get from 'lodash.get';
import interpolateFields from './interpolateFields';
import debugGenerator from './debug-generator';

export default function matchComponent(config, typeConstruct, debugInstance) {
  const type = typeConstruct[0].split('.');
  const id = get(typeConstruct, '[1]') && typeConstruct[1].split('.');
  const componentMatched = interpolateFields(type, id, null, config, false, debugInstance);
  debugGenerator(componentMatched ? `Component matched on ${ componentMatched.configurationPath}` : `Could not match component on ${ type }`, debugInstance);
  return componentMatched;
}
