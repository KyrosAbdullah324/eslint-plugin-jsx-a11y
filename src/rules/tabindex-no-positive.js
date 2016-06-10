/**
 * @fileoverview Enforce tabIndex value is not greater than zero.
 * @author Ethan Cohen
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import { getLiteralPropValue } from 'jsx-ast-utils';

const errorMessage = 'Avoid positive integer values for tabIndex.';

module.exports = context => ({
  JSXAttribute: attribute => {
    const name = attribute.name.name;
    const normalizedName = name.toUpperCase();

    // Check if tabIndex is the attribute
    if (normalizedName !== 'TABINDEX') {
      return;
    }

    // Only check literals because we can't infer values from certain expressions.
    const value = Number(getLiteralPropValue(attribute));

    if (isNaN(value) || value <= 0) {
      return;
    }

    context.report({
      node: attribute,
      message: errorMessage,
    });
  },
});

module.exports.schema = [
  { type: 'object' },
];
