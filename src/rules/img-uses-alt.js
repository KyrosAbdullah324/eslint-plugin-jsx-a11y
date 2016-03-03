/**
 * @fileoverview Enforce img tag uses alt attribute.
 * @author Ethan Cohen
 */
'use strict';

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import hasAttribute from '../util/hasAttribute';

const errorMessage = type => `${type} elements must have an alt tag.`;

module.exports = context => ({
  JSXOpeningElement: node => {
    const typeCheck = [ 'img' ].concat(context.options[0]);
    const nodeType = node.name.name;

    // Only check 'img' elements and custom types.
    if (typeCheck.indexOf(nodeType) === -1) {
      return;
    }

    const hasAltProp = hasAttribute(node.attributes, 'alt');

    // alt must have a value.
    if (hasAltProp === false || hasAltProp === null) {
      context.report({
        node,
        message: errorMessage(nodeType)
      });
    }
  }
});

module.exports.schema = [
  {
    "oneOf": [
      { "type": "string" },
      {
        "type": "array",
        "items": {
          "type": "string"
        },
        "minItems": 1,
        "uniqueItems": true
      }
    ]
  }
];
