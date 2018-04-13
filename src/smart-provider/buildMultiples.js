import buildChildren from './buildChildren';

export default function buildMultiples(multiples, config) {
  return multiples.map((multiple) => buildChildren(multiple, config));
}
