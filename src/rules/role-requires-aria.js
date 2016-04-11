/**
 * @fileoverview Enforce that elements with ARIA roles must have all required attributes for that role.
 * @author Ethan Cohen
 */
'use strict';

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import validRoleTypes from '../util/attributes/role';
import { getLiteralAttributeValue } from '../util/getAttributeValue';
import hasAttribute from '../util/hasAttribute';

const errorMessage = (role, requiredProps) =>
  `Elements with the ARIA role "${role}" must have the following ` +
  `attributes defined: ${requiredProps.toString().toLowerCase()}`;

module.exports = context => ({
  JSXAttribute: attribute => {
    const normalizedName = attribute.name.name.toUpperCase();
    if (normalizedName !== 'ROLE') {
      return;
    }

    const value = getLiteralAttributeValue(attribute);

    // If value is undefined, then the role attribute will be dropped in the DOM.
    // If value is null, then getLiteralAttributeValue is telling us that the value isn't in the form of a literal.
    if (value === undefined || value === null) {
      return;
    }

    const normalizedValues = `${value}`.toUpperCase().split(" ");
    const validRoles = normalizedValues.filter(value => Object.keys(validRoleTypes).indexOf(value) > -1);

    validRoles.forEach(role => {
      const { requiredProps } = validRoleTypes[role];

      if (requiredProps.length > 0) {
        const hasRequiredProps = requiredProps.every(prop => hasAttribute(attribute.parent.attributes, prop));

        if (hasRequiredProps === false) {
          context.report({
            node: attribute,
            message: errorMessage(role.toLowerCase(), requiredProps)
          });
        }
      }
    });

  }
});

module.exports.schema = [
  { type: 'object' }
];
