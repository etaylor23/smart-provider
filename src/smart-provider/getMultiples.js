import get from 'lodash.get';
import getComponent from './getComponent';
import { potentialMultipleNodes } from './index';

export default function getMultiples(data, instantAccessKey, accessKey, typeConstruct, config, debugInstance) {
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
      return get(part, certifiedNested) ? getMultiples(
        part,
        certifiedNested,
        `${finalKey}[${index}]`,
        [ finalTypeConstruct, finalIdConstruct ],
        config,
        debugInstance
      ): null;
    })[0]
    const component = getComponent(
      part,
      `${finalKey}[${index}]`,
      [ finalTypeConstruct, finalIdConstruct ],
      config,
      debugInstance
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
