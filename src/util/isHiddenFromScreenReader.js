'use strict';

import hasAttribute from './hasAttribute';
import getAttributeValue, { getLiteralAttributeValue } from './getAttributeValue';



/**
 * Returns boolean indicating that the aria-hidden prop
 * is present or the value is true. Will also return true if
 * there is an input with type='hidden'.
 *
 * <div aria-hidden /> is equivalent to the DOM as <div aria-hidden=true />.
 */
const isHiddenFromScreenReader = (type, attributes) => {
  if (type.toUpperCase() === 'INPUT') {
    const hidden = getLiteralAttributeValue(hasAttribute(attributes, 'type'));

    if (hidden && hidden.toUpperCase() == 'HIDDEN') {
      return true;
    }
  }

  const ariaHidden = getAttributeValue(hasAttribute(attributes, 'aria-hidden'));
  return ariaHidden === true;
};

export default isHiddenFromScreenReader;
