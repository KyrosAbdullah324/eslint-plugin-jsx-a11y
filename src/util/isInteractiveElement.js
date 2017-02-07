/**
 * @flow
 */
import {
  dom,
  elementRoles,
  roles,
} from 'aria-query';
import type { Node } from 'ast-types-flow';
import {
  getProp,
  getPropValue,
  getLiteralPropValue,
  propName,
} from 'jsx-ast-utils';
import getTabIndex from './getTabIndex';

type ElementCallbackMap = {
  [elementName: string]: (attributes: Array<Node>) => boolean,
};

const interactiveRoles = new Set(
  [...roles.keys()]
    .filter(name => !roles.get(name).abstract)
    .filter(name => roles.get(name).interactive),
);
const DOMElements = [...dom.keys()];
const pureInteractiveElements = DOMElements.reduce(
  (
    accumulator: ElementCallbackMap,
    name: string,
  ): ElementCallbackMap => {
    const interactiveElements = accumulator;
    if (
      dom.get(name).interactive
      && !dom.get(name).reserved
    ) {
      interactiveElements[name] = () => true;
    }
    return interactiveElements;
  },
  {},
);
// Map of tagNames to functions that return whether that element is interactive or not.
const pureInteractiveRoleElements = [...elementRoles.entries()]
  .reduce((
    accumulator: ElementCallbackMap,
    [
      // $FlowFixMe: Flow is incorrectly inferring that this is a number.
      elementSchemaJSON,
      // $FlowFixMe: Flow is incorrectly inferring that this is a number.
      roleSet,
    ],
  ): ElementCallbackMap => {
    const interactiveElements = accumulator;
    // $FlowFixMe: Flow is incorrectly inferring that this is a number.
    const elementSchema = JSON.parse(elementSchemaJSON);
    const elementName = elementSchema.name;
    const elementAttributes = elementSchema.attributes || [];
    interactiveElements[elementName] = (attributes: Array<Node>): boolean => {
      const passedAttrCheck =
        elementAttributes.length === 0 ||
        elementAttributes.every(
          (controlAttr): boolean => attributes.some(
            (attr): boolean => (
              controlAttr.name === propName(attr).toLowerCase()
              && controlAttr.value === getLiteralPropValue(attr)
            ),
          ),
        );
      // [].some is used here because some elements are associated with both
      // interactive and non-interactive roles. Like select, which is
      // associated with combobox and listbox.
      return passedAttrCheck && [...roleSet.keys()].some(
        (roleName): boolean => interactiveRoles.has(roleName),
      );
    };
    return interactiveElements;
  }, {});

const isLink = function isLink(attributes) {
  const href = getPropValue(getProp(attributes, 'href'));
  const tabIndex = getTabIndex(getProp(attributes, 'tabIndex'));
  return href !== undefined || tabIndex !== undefined;
};

export const interactiveElementsMap = {
  ...pureInteractiveRoleElements,
  a: isLink,
  area: isLink,
  input: (attributes) => {
    const typeAttr = getLiteralPropValue(getProp(attributes, 'type'));
    return typeAttr ? typeAttr.toUpperCase() !== 'HIDDEN' : true;
  },
  // Although this is associated with an interactive role, it should not be
  // considered interactive in HTML.
  link: () => false,
  td: (attributes) => getLiteralPropValue(
    getProp(attributes, 'role')
  ) === 'gridcell',
};

/**
 * Returns boolean indicating whether the given element is
 * interactive on the DOM or not. Usually used when an element
 * has a dynamic handler on it and we need to discern whether or not
 * it's intention is to be interacted with on the DOM.
 */
const isInteractiveElement = (
  tagName: string,
  attributes: Array<Node>,
): boolean => {

  // The element does not have an explicit role, determine if it has an
  // inherently interactive role.
  if ({}.hasOwnProperty.call(interactiveElementsMap, tagName) === false) {
    return false;
  }

  return interactiveElementsMap[tagName](attributes);
};

export default isInteractiveElement;
