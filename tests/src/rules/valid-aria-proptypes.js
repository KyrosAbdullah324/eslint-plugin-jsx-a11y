/**
 * @fileoverview Enforce ARIA state and property values are valid.
 * @author Ethan Cohen
 */

'use strict';

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import rule from '../../../src/rules/valid-aria-proptypes';
import { RuleTester } from 'eslint';

const parserOptions = {
  ecmaVersion: 6,
  ecmaFeatures: {
    jsx: true
  }
};

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

import ariaAttributes from '../../../src/util/ariaAttributes';

const errorMessage = name => ({
  message: `${name} must be of type ${ariaAttributes[name.toUpperCase()].value}.`,
  type: 'JSXAttribute'
});

ruleTester.run('valid-aria-proptypes', rule, {
  valid: [
    // BOOLEAN
    { code: '<div aria-hidden={true} />', parserOptions },
    { code: '<div aria-hidden="true" />', parserOptions },
    { code: '<div aria-hidden={"false"} />', parserOptions },
    { code: '<div aria-hidden={!false} />', parserOptions },
    { code: '<div aria-hidden />', parserOptions },
    { code: '<div aria-hidden={false} />', parserOptions },
    { code: '<div aria-hidden={!true} />', parserOptions },
    { code: '<div aria-hidden={!"yes"} />', parserOptions },
    { code: '<div aria-hidden={foo} />', parserOptions },

    // STRING
    { code: '<div aria-label="Close" />', parserOptions },
    { code: '<div aria-label={`Close`} />', parserOptions },
    { code: '<div aria-label={foo} />', parserOptions },

    // TRISTATE
    { code: '<div aria-checked={true} />', parserOptions },
    { code: '<div aria-checked="true" />', parserOptions },
    { code: '<div aria-checked={"false"} />', parserOptions },
    { code: '<div aria-checked={!false} />', parserOptions },
    { code: '<div aria-checked />', parserOptions },
    { code: '<div aria-checked={false} />', parserOptions },
    { code: '<div aria-checked={!true} />', parserOptions },
    { code: '<div aria-checked={!"yes"} />', parserOptions },
    { code: '<div aria-checked={foo} />', parserOptions },
    { code: '<div aria-checked="mixed" />', parserOptions },
    { code: '<div aria-checked={`mixed`} />', parserOptions },

    // INTEGER
    { code: '<div aria-level={123} />', parserOptions },
    { code: '<div aria-level={-123} />', parserOptions },
    { code: '<div aria-level={+123} />', parserOptions },
    { code: '<div aria-level={~123} />', parserOptions },
    { code: '<div aria-level={"123"} />', parserOptions },
    { code: '<div aria-level={`123`} />', parserOptions },
    { code: '<div aria-level="123" />', parserOptions },
    { code: '<div aria-level={foo} />', parserOptions },

    // NUMBER
    { code: '<div aria-valuemax={123} />', parserOptions },
    { code: '<div aria-valuemax={-123} />', parserOptions },
    { code: '<div aria-valuemax={+123} />', parserOptions },
    { code: '<div aria-valuemax={~123} />', parserOptions },
    { code: '<div aria-valuemax={"123"} />', parserOptions },
    { code: '<div aria-valuemax={`123`} />', parserOptions },
    { code: '<div aria-valuemax="123" />', parserOptions },
    { code: '<div aria-valuemax={foo} />', parserOptions },

    // TOKEN
    { code: '<div aria-sort="ascending" />', parserOptions },
    { code: '<div aria-sort="ASCENDING" />', parserOptions },
    { code: '<div aria-sort={"ascending"} />', parserOptions },
    { code: '<div aria-sort={`ascending`} />', parserOptions },
    { code: '<div aria-sort="descending" />', parserOptions },
    { code: '<div aria-sort={"descending"} />', parserOptions },
    { code: '<div aria-sort={`descending`} />', parserOptions },
    { code: '<div aria-sort="none" />', parserOptions },
    { code: '<div aria-sort={"none"} />', parserOptions },
    { code: '<div aria-sort={`none`} />', parserOptions },
    { code: '<div aria-sort="other" />', parserOptions },
    { code: '<div aria-sort={"other"} />', parserOptions },
    { code: '<div aria-sort={`other`} />', parserOptions },

    // TOKENLIST
    { code: '<div aria-relevant="additions" />', parserOptions },
    { code: '<div aria-relevant={"additions"} />', parserOptions },
    { code: '<div aria-relevant={`additions`} />', parserOptions },
    { code: '<div aria-relevant="additions removals" />', parserOptions },
    { code: '<div aria-relevant="additions additions" />', parserOptions },
    { code: '<div aria-relevant={"additions removals"} />', parserOptions },
    { code: '<div aria-relevant={`additions removals`} />', parserOptions },
    { code: '<div aria-relevant="additions removals text" />', parserOptions },
    { code: '<div aria-relevant={"additions removals text"} />', parserOptions },
    { code: '<div aria-relevant={`additions removals text`} />', parserOptions },
    { code: '<div aria-relevant="additions removals text all" />', parserOptions },
    { code: '<div aria-relevant={"additions removals text all"} />', parserOptions },
    { code: '<div aria-relevant={`removals additions text all`} />', parserOptions }
  ],
  invalid: [
    // BOOLEAN
    { code: '<div aria-hidden={undefined} />', errors: [ errorMessage('aria-hidden') ], parserOptions },
    { code: '<div aria-hidden="yes" />', errors: [ errorMessage('aria-hidden') ], parserOptions },
    { code: '<div aria-hidden="no" />', errors: [ errorMessage('aria-hidden') ], parserOptions },
    { code: '<div aria-hidden={1234} />', errors: [ errorMessage('aria-hidden') ], parserOptions },
    { code: '<div aria-hidden={`${abc}`} />', errors: [ errorMessage('aria-hidden') ], parserOptions },

    // STRING
    { code: '<div aria-label={undefined} />', errors: [ errorMessage('aria-label') ], parserOptions },
    { code: '<div aria-label />', errors: [ errorMessage('aria-label') ], parserOptions },
    { code: '<div aria-label={true} />', errors: [ errorMessage('aria-label') ], parserOptions },
    { code: '<div aria-label={false} />', errors: [ errorMessage('aria-label') ], parserOptions },
    { code: '<div aria-label={1234} />', errors: [ errorMessage('aria-label') ], parserOptions },
    { code: '<div aria-label={!true} />', errors: [ errorMessage('aria-label') ], parserOptions },

    // TRISTATE
    { code: '<div aria-checked={undefined} />', errors: [ errorMessage('aria-checked') ], parserOptions },
    { code: '<div aria-checked="yes" />', errors: [ errorMessage('aria-checked') ], parserOptions },
    { code: '<div aria-checked="no" />', errors: [ errorMessage('aria-checked') ], parserOptions },
    { code: '<div aria-checked={1234} />', errors: [ errorMessage('aria-checked') ], parserOptions },
    { code: '<div aria-checked={`${abc}`} />', errors: [ errorMessage('aria-checked') ], parserOptions },

    // INTEGER
    { code: '<div aria-level={undefined} />', errors: [ errorMessage('aria-level') ], parserOptions },
    { code: '<div aria-level="yes" />', errors: [ errorMessage('aria-level') ], parserOptions },
    { code: '<div aria-level="no" />', errors: [ errorMessage('aria-level') ], parserOptions },
    { code: '<div aria-level={`abc`} />', errors: [ errorMessage('aria-level') ], parserOptions },
    { code: '<div aria-level={true} />', errors: [ errorMessage('aria-level') ], parserOptions },
    { code: '<div aria-level />', errors: [ errorMessage('aria-level') ], parserOptions },
    { code: '<div aria-level={"false"} />', errors: [ errorMessage('aria-level') ], parserOptions },
    { code: '<div aria-level={!"false"} />', errors: [ errorMessage('aria-level') ], parserOptions },

    // NUMBER
    { code: '<div aria-valuemax={undefined} />', errors: [ errorMessage('aria-valuemax') ], parserOptions },
    { code: '<div aria-valuemax="yes" />', errors: [ errorMessage('aria-valuemax') ], parserOptions },
    { code: '<div aria-valuemax="no" />', errors: [ errorMessage('aria-valuemax') ], parserOptions },
    { code: '<div aria-valuemax={`abc`} />', errors: [ errorMessage('aria-valuemax') ], parserOptions },
    { code: '<div aria-valuemax={true} />', errors: [ errorMessage('aria-valuemax') ], parserOptions },
    { code: '<div aria-valuemax />', errors: [ errorMessage('aria-valuemax') ], parserOptions },
    { code: '<div aria-valuemax={"false"} />', errors: [ errorMessage('aria-valuemax') ], parserOptions },
    { code: '<div aria-valuemax={!"false"} />', errors: [ errorMessage('aria-valuemax') ], parserOptions },

    // TOKEN
    { code: '<div aria-sort="" />', errors: [ errorMessage('aria-sort') ], parserOptions },
    { code: '<div aria-sort="descnding" />', errors: [ errorMessage('aria-sort') ], parserOptions },
    { code: '<div aria-sort />', errors: [ errorMessage('aria-sort') ], parserOptions },
    { code: '<div aria-sort={undefined} />', errors: [ errorMessage('aria-sort') ], parserOptions },
    { code: '<div aria-sort={true} />', errors: [ errorMessage('aria-sort') ], parserOptions },
    { code: '<div aria-sort={"false"} />', errors: [ errorMessage('aria-sort') ], parserOptions },
    { code: '<div aria-sort="ascending descending" />', errors: [ errorMessage('aria-sort') ], parserOptions },

    // TOKENLIST
    { code: '<div aria-relevant="" />', errors: [ errorMessage('aria-relevant') ], parserOptions },
    { code: '<div aria-relevant="foobar" />', errors: [ errorMessage('aria-relevant') ], parserOptions },
    { code: '<div aria-relevant />', errors: [ errorMessage('aria-relevant') ], parserOptions },
    { code: '<div aria-relevant={undefined} />', errors: [ errorMessage('aria-relevant') ], parserOptions },
    { code: '<div aria-relevant={true} />', errors: [ errorMessage('aria-relevant') ], parserOptions },
    { code: '<div aria-relevant={"false"} />', errors: [ errorMessage('aria-relevant') ], parserOptions },
    { code: '<div aria-relevant="additions removalss" />', errors: [ errorMessage('aria-relevant') ], parserOptions },
    { code: '<div aria-relevant="additions removalss " />', errors: [ errorMessage('aria-relevant') ], parserOptions }
  ]
});
