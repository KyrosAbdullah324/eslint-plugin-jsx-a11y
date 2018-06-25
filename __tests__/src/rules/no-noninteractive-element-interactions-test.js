/* eslint-env jest */
/**
 * @fileoverview Enforce non-interactive elements have no interactive handlers.
 * @author Ethan Cohen
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import { configs } from '../../../src/index';
import parserOptionsMapper from '../../__util__/parserOptionsMapper';
import rule from '../../../src/rules/no-noninteractive-element-interactions';
import ruleOptionsMapperFactory from '../../__util__/ruleOptionsMapperFactory';

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

const errorMessage = 'Non-interactive elements should not be assigned mouse or keyboard event listeners.';

const expectedError = {
  message: errorMessage,
  type: 'JSXOpeningElement',
};

const ruleName = 'no-noninteractive-element-interactions';

const alwaysValid = [
  { code: '<TestComponent onClick={doFoo} />' },
  { code: '<Button onClick={doFoo} />' },
  /* All flavors of input */
  { code: '<input onClick={() => void 0} />' },
  { code: '<input type="button" onClick={() => void 0} />' },
  { code: '<input type="checkbox" onClick={() => void 0} />' },
  { code: '<input type="color" onClick={() => void 0} />' },
  { code: '<input type="date" onClick={() => void 0} />' },
  { code: '<input type="datetime" onClick={() => void 0} />' },
  { code: '<input type="datetime-local" onClick={() => void 0} />' },
  { code: '<input type="email" onClick={() => void 0} />' },
  { code: '<input type="file" onClick={() => void 0} />' },
  { code: '<input type="image" onClick={() => void 0} />' },
  { code: '<input type="month" onClick={() => void 0} />' },
  { code: '<input type="number" onClick={() => void 0} />' },
  { code: '<input type="password" onClick={() => void 0} />' },
  { code: '<input type="radio" onClick={() => void 0} />' },
  { code: '<input type="range" onClick={() => void 0} />' },
  { code: '<input type="reset" onClick={() => void 0} />' },
  { code: '<input type="search" onClick={() => void 0} />' },
  { code: '<input type="submit" onClick={() => void 0} />' },
  { code: '<input type="tel" onClick={() => void 0} />' },
  { code: '<input type="text" onClick={() => void 0} />' },
  { code: '<input type="time" onClick={() => void 0} />' },
  { code: '<input type="url" onClick={() => void 0} />' },
  { code: '<input type="week" onClick={() => void 0} />' },
  { code: '<input type="hidden" onClick={() => void 0} />' },
  /* End all flavors of input */
  { code: '<a onClick={() => void 0} />' },
  { code: '<a onClick={() => {}} />;' },
  { code: '<a tabIndex="0" onClick={() => void 0} />' },
  { code: '<a onClick={() => void 0} href="http://x.y.z" />' },
  { code: '<a onClick={() => void 0} href="http://x.y.z" tabIndex="0" />' },
  { code: '<area onClick={() => {}} />;' },
  { code: '<button onClick={() => void 0} className="foo" />' },
  { code: '<label onClick={() => {}} />;' },
  { code: '<menuitem onClick={() => {}} />;' },
  { code: '<option onClick={() => void 0} className="foo" />' },
  { code: '<select onClick={() => void 0} className="foo" />' },
  { code: '<textarea onClick={() => void 0} className="foo" />' },
  { code: '<tr onClick={() => {}} />;' },
  /* HTML elements with neither an interactive or non-interactive valence (static) */
  { code: '<acronym onClick={() => {}} />;' },
  { code: '<address onClick={() => {}} />;' },
  { code: '<applet onClick={() => {}} />;' },
  { code: '<aside onClick={() => {}} />;' },
  { code: '<audio onClick={() => {}} />;' },
  { code: '<b onClick={() => {}} />;' },
  { code: '<base onClick={() => {}} />;' },
  { code: '<bdi onClick={() => {}} />;' },
  { code: '<bdo onClick={() => {}} />;' },
  { code: '<big onClick={() => {}} />;' },
  { code: '<blink onClick={() => {}} />;' },
  { code: '<body onClick={() => {}} />;' },
  { code: '<body onLoad={() => {}} />;' },
  { code: '<canvas onClick={() => {}} />;' },
  { code: '<center onClick={() => {}} />;' },
  { code: '<cite onClick={() => {}} />;' },
  { code: '<code onClick={() => {}} />;' },
  { code: '<col onClick={() => {}} />;' },
  { code: '<colgroup onClick={() => {}} />;' },
  { code: '<content onClick={() => {}} />;' },
  { code: '<data onClick={() => {}} />;' },
  { code: '<datalist onClick={() => {}} />;' },
  { code: '<del onClick={() => {}} />;' },
  { code: '<div />;' },
  { code: '<div className="foo" />;' },
  { code: '<div className="foo" {...props} />;' },
  { code: '<div onClick={() => void 0} aria-hidden />;' },
  { code: '<div onClick={() => void 0} aria-hidden={true} />;' },
  { code: '<div onClick={() => void 0} />;' },
  { code: '<div onClick={() => void 0} role={undefined} />;' },
  { code: '<div onClick={() => void 0} {...props} />;' },
  { code: '<div onClick={null} />;' },
  { code: '<div onKeyUp={() => void 0} aria-hidden={false} />;' },
  { code: '<em onClick={() => {}} />;' },
  { code: '<embed onClick={() => {}} />;' },
  { code: '<font onClick={() => {}} />;' },
  { code: '<font onSubmit={() => {}} />;' },
  { code: '<frameset onClick={() => {}} />;' },
  { code: '<head onClick={() => {}} />;' },
  { code: '<header onClick={() => {}} />;' },
  { code: '<hgroup onClick={() => {}} />;' },
  { code: '<html onClick={() => {}} />;' },
  { code: '<i onClick={() => {}} />;' },
  { code: '<iframe onLoad={() => {}} />;' },
  { code: '<img onError={() => {}} />;' },
  { code: '<img onLoad={() => {}} />;' },
  { code: '<ins onClick={() => {}} />;' },
  { code: '<kbd onClick={() => {}} />;' },
  { code: '<keygen onClick={() => {}} />;' },
  { code: '<link onClick={() => {}} />;' },
  { code: '<main onClick={null} />;' },
  { code: '<map onClick={() => {}} />;' },
  { code: '<meta onClick={() => {}} />;' },
  { code: '<noembed onClick={() => {}} />;' },
  { code: '<noscript onClick={() => {}} />;' },
  { code: '<object onClick={() => {}} />;' },
  { code: '<optgroup onClick={() => {}} />;' },
  { code: '<output onClick={() => {}} />;' },
  { code: '<param onClick={() => {}} />;' },
  { code: '<picture onClick={() => {}} />;' },
  { code: '<q onClick={() => {}} />;' },
  { code: '<rp onClick={() => {}} />;' },
  { code: '<rt onClick={() => {}} />;' },
  { code: '<rtc onClick={() => {}} />;' },
  { code: '<s onClick={() => {}} />;' },
  { code: '<samp onClick={() => {}} />;' },
  { code: '<script onClick={() => {}} />;' },
  { code: '<small onClick={() => {}} />;' },
  { code: '<source onClick={() => {}} />;' },
  { code: '<spacer onClick={() => {}} />;' },
  { code: '<span onClick={() => {}} />;' },
  { code: '<strike onClick={() => {}} />;' },
  { code: '<strong onClick={() => {}} />;' },
  { code: '<style onClick={() => {}} />;' },
  { code: '<sub onClick={() => {}} />;' },
  { code: '<summary onClick={() => {}} />;' },
  { code: '<sup onClick={() => {}} />;' },
  { code: '<th onClick={() => {}} />;' },
  { code: '<title onClick={() => {}} />;' },
  { code: '<track onClick={() => {}} />;' },
  { code: '<tt onClick={() => {}} />;' },
  { code: '<u onClick={() => {}} />;' },
  { code: '<var onClick={() => {}} />;' },
  { code: '<video onClick={() => {}} />;' },
  { code: '<wbr onClick={() => {}} />;' },
  { code: '<xmp onClick={() => {}} />;' },
  /* HTML elements attributed with an interactive role */
  { code: '<div role="button" onClick={() => {}} />;' },
  { code: '<div role="checkbox" onClick={() => {}} />;' },
  { code: '<div role="columnheader" onClick={() => {}} />;' },
  { code: '<div role="combobox" onClick={() => {}} />;' },
  { code: '<div role="grid" onClick={() => {}} />;' },
  { code: '<div role="gridcell" onClick={() => {}} />;' },
  { code: '<div role="link" onClick={() => {}} />;' },
  { code: '<div role="listbox" onClick={() => {}} />;' },
  { code: '<div role="menu" onClick={() => {}} />;' },
  { code: '<div role="menubar" onClick={() => {}} />;' },
  { code: '<div role="menuitem" onClick={() => {}} />;' },
  { code: '<div role="menuitemcheckbox" onClick={() => {}} />;' },
  { code: '<div role="menuitemradio" onClick={() => {}} />;' },
  { code: '<div role="option" onClick={() => {}} />;' },
  { code: '<div role="progressbar" onClick={() => {}} />;' },
  { code: '<div role="radio" onClick={() => {}} />;' },
  { code: '<div role="radiogroup" onClick={() => {}} />;' },
  { code: '<div role="row" onClick={() => {}} />;' },
  { code: '<div role="rowheader" onClick={() => {}} />;' },
  { code: '<div role="searchbox" onClick={() => {}} />;' },
  { code: '<div role="slider" onClick={() => {}} />;' },
  { code: '<div role="spinbutton" onClick={() => {}} />;' },
  { code: '<div role="switch" onClick={() => {}} />;' },
  { code: '<div role="tab" onClick={() => {}} />;' },
  { code: '<div role="textbox" onClick={() => {}} />;' },
  { code: '<div role="treeitem" onClick={() => {}} />;' },
  /* Presentation is a special case role that indicates intentional static semantics */
  { code: '<div role="presentation" onClick={() => {}} />;' },
  /* HTML elements attributed with an abstract role */
  { code: '<div role="command" onClick={() => {}} />;' },
  { code: '<div role="composite" onClick={() => {}} />;' },
  { code: '<div role="input" onClick={() => {}} />;' },
  { code: '<div role="landmark" onClick={() => {}} />;' },
  { code: '<div role="range" onClick={() => {}} />;' },
  { code: '<div role="roletype" onClick={() => {}} />;' },
  { code: '<div role="sectionhead" onClick={() => {}} />;' },
  { code: '<div role="select" onClick={() => {}} />;' },
  { code: '<div role="structure" onClick={() => {}} />;' },
  { code: '<div role="tablist" onClick={() => {}} />;' },
  { code: '<div role="toolbar" onClick={() => {}} />;' },
  { code: '<div role="tree" onClick={() => {}} />;' },
  { code: '<div role="treegrid" onClick={() => {}} />;' },
  { code: '<div role="widget" onClick={() => {}} />;' },
  { code: '<div role="window" onClick={() => {}} />;' },
  // All the possible handlers
  { code: '<div role="article" onCopy={() => {}} />;' },
  { code: '<div role="article" onCut={() => {}} />;' },
  { code: '<div role="article" onPaste={() => {}} />;' },
  { code: '<div role="article" onCompositionEnd={() => {}} />;' },
  { code: '<div role="article" onCompositionStart={() => {}} />;' },
  { code: '<div role="article" onCompositionUpdate={() => {}} />;' },
  { code: '<div role="article" onChange={() => {}} />;' },
  { code: '<div role="article" onInput={() => {}} />;' },
  { code: '<div role="article" onSubmit={() => {}} />;' },
  { code: '<div role="article" onSelect={() => {}} />;' },
  { code: '<div role="article" onTouchCancel={() => {}} />;' },
  { code: '<div role="article" onTouchEnd={() => {}} />;' },
  { code: '<div role="article" onTouchMove={() => {}} />;' },
  { code: '<div role="article" onTouchStart={() => {}} />;' },
  { code: '<div role="article" onScroll={() => {}} />;' },
  { code: '<div role="article" onWheel={() => {}} />;' },
  { code: '<div role="article" onAbort={() => {}} />;' },
  { code: '<div role="article" onCanPlay={() => {}} />;' },
  { code: '<div role="article" onCanPlayThrough={() => {}} />;' },
  { code: '<div role="article" onDurationChange={() => {}} />;' },
  { code: '<div role="article" onEmptied={() => {}} />;' },
  { code: '<div role="article" onEncrypted={() => {}} />;' },
  { code: '<div role="article" onEnded={() => {}} />;' },
  { code: '<div role="article" onLoadedData={() => {}} />;' },
  { code: '<div role="article" onLoadedMetadata={() => {}} />;' },
  { code: '<div role="article" onLoadStart={() => {}} />;' },
  { code: '<div role="article" onPause={() => {}} />;' },
  { code: '<div role="article" onPlay={() => {}} />;' },
  { code: '<div role="article" onPlaying={() => {}} />;' },
  { code: '<div role="article" onProgress={() => {}} />;' },
  { code: '<div role="article" onRateChange={() => {}} />;' },
  { code: '<div role="article" onSeeked={() => {}} />;' },
  { code: '<div role="article" onSeeking={() => {}} />;' },
  { code: '<div role="article" onStalled={() => {}} />;' },
  { code: '<div role="article" onSuspend={() => {}} />;' },
  { code: '<div role="article" onTimeUpdate={() => {}} />;' },
  { code: '<div role="article" onVolumeChange={() => {}} />;' },
  { code: '<div role="article" onWaiting={() => {}} />;' },
  { code: '<div role="article" onAnimationStart={() => {}} />;' },
  { code: '<div role="article" onAnimationEnd={() => {}} />;' },
  { code: '<div role="article" onAnimationIteration={() => {}} />;' },
  { code: '<div role="article" onTransitionEnd={() => {}} />;' },
];

const neverValid = [
  /* HTML elements with an inherent, non-interactive role */
  { code: '<main onClick={() => void 0} />;', errors: [expectedError] },
  { code: '<article onClick={() => {}} />;', errors: [expectedError] },
  { code: '<blockquote onClick={() => {}} />;', errors: [expectedError] },
  { code: '<br onClick={() => {}} />;', errors: [expectedError] },
  { code: '<caption onClick={() => {}} />;', errors: [expectedError] },
  { code: '<dd onClick={() => {}} />;', errors: [expectedError] },
  { code: '<details onClick={() => {}} />;', errors: [expectedError] },
  { code: '<dfn onClick={() => {}} />;', errors: [expectedError] },
  { code: '<dl onClick={() => {}} />;', errors: [expectedError] },
  { code: '<dir onClick={() => {}} />;', errors: [expectedError] },
  { code: '<dt onClick={() => {}} />;', errors: [expectedError] },
  { code: '<fieldset onClick={() => {}} />;', errors: [expectedError] },
  { code: '<figcaption onClick={() => {}} />;', errors: [expectedError] },
  { code: '<figure onClick={() => {}} />;', errors: [expectedError] },
  { code: '<footer onClick={() => {}} />;', errors: [expectedError] },
  { code: '<form onClick={() => {}} />;', errors: [expectedError] },
  { code: '<frame onClick={() => {}} />;', errors: [expectedError] },
  { code: '<h1 onClick={() => {}} />;', errors: [expectedError] },
  { code: '<h2 onClick={() => {}} />;', errors: [expectedError] },
  { code: '<h3 onClick={() => {}} />;', errors: [expectedError] },
  { code: '<h4 onClick={() => {}} />;', errors: [expectedError] },
  { code: '<h5 onClick={() => {}} />;', errors: [expectedError] },
  { code: '<h6 onClick={() => {}} />;', errors: [expectedError] },
  { code: '<hr onClick={() => {}} />;', errors: [expectedError] },
  { code: '<iframe onClick={() => {}} />;', errors: [expectedError] },
  { code: '<img onClick={() => {}} />;', errors: [expectedError] },
  { code: '<legend onClick={() => {}} />;', errors: [expectedError] },
  { code: '<li onClick={() => {}} />;', errors: [expectedError] },
  { code: '<mark onClick={() => {}} />;', errors: [expectedError] },
  { code: '<marquee onClick={() => {}} />;', errors: [expectedError] },
  { code: '<menu onClick={() => {}} />;', errors: [expectedError] },
  { code: '<meter onClick={() => {}} />;', errors: [expectedError] },
  { code: '<nav onClick={() => {}} />;', errors: [expectedError] },
  { code: '<ol onClick={() => {}} />;', errors: [expectedError] },
  { code: '<p onClick={() => {}} />;', errors: [expectedError] },
  { code: '<pre onClick={() => {}} />;', errors: [expectedError] },
  { code: '<progress onClick={() => {}} />;', errors: [expectedError] },
  { code: '<ruby onClick={() => {}} />;', errors: [expectedError] },
  { code: '<section onClick={() => {}} />;', errors: [expectedError] },
  { code: '<table onClick={() => {}} />;', errors: [expectedError] },
  { code: '<tbody onClick={() => {}} />;', errors: [expectedError] },
  { code: '<td onClick={() => {}} />;', errors: [expectedError] },
  { code: '<tfoot onClick={() => {}} />;', errors: [expectedError] },
  { code: '<thead onClick={() => {}} />;', errors: [expectedError] },
  { code: '<time onClick={() => {}} />;', errors: [expectedError] },
  { code: '<ol onClick={() => {}} />;', errors: [expectedError] },
  { code: '<ul onClick={() => {}} />;', errors: [expectedError] },
  /* HTML elements attributed with a non-interactive role */
  { code: '<div role="alert" onClick={() => {}} />;', errors: [expectedError] },
  { code: '<div role="alertdialog" onClick={() => {}} />;', errors: [expectedError] },
  { code: '<div role="application" onClick={() => {}} />;', errors: [expectedError] },
  { code: '<div role="article" onClick={() => {}} />;', errors: [expectedError] },
  { code: '<div role="banner" onClick={() => {}} />;', errors: [expectedError] },
  { code: '<div role="cell" onClick={() => {}} />;', errors: [expectedError] },
  { code: '<div role="complementary" onClick={() => {}} />;', errors: [expectedError] },
  { code: '<div role="contentinfo" onClick={() => {}} />;', errors: [expectedError] },
  { code: '<div role="definition" onClick={() => {}} />;', errors: [expectedError] },
  { code: '<div role="dialog" onClick={() => {}} />;', errors: [expectedError] },
  { code: '<div role="directory" onClick={() => {}} />;', errors: [expectedError] },
  { code: '<div role="document" onClick={() => {}} />;', errors: [expectedError] },
  { code: '<div role="feed" onClick={() => {}} />;', errors: [expectedError] },
  { code: '<div role="figure" onClick={() => {}} />;', errors: [expectedError] },
  { code: '<div role="form" onClick={() => {}} />;', errors: [expectedError] },
  { code: '<div role="group" onClick={() => {}} />;', errors: [expectedError] },
  { code: '<div role="heading" onClick={() => {}} />;', errors: [expectedError] },
  { code: '<div role="img" onClick={() => {}} />;', errors: [expectedError] },
  { code: '<div role="list" onClick={() => {}} />;', errors: [expectedError] },
  { code: '<div role="listitem" onClick={() => {}} />;', errors: [expectedError] },
  { code: '<div role="log" onClick={() => {}} />;', errors: [expectedError] },
  { code: '<div role="main" onClick={() => {}} />;', errors: [expectedError] },
  { code: '<div role="marquee" onClick={() => {}} />;', errors: [expectedError] },
  { code: '<div role="math" onClick={() => {}} />;', errors: [expectedError] },
  { code: '<div role="navigation" onClick={() => {}} />;', errors: [expectedError] },
  { code: '<div role="note" onClick={() => {}} />;', errors: [expectedError] },
  { code: '<div role="region" onClick={() => {}} />;', errors: [expectedError] },
  { code: '<div role="rowgroup" onClick={() => {}} />;', errors: [expectedError] },
  { code: '<div role="search" onClick={() => {}} />;', errors: [expectedError] },
  { code: '<div role="separator" onClick={() => {}} />;', errors: [expectedError] },
  { code: '<div role="scrollbar" onClick={() => {}} />;', errors: [expectedError] },
  { code: '<div role="status" onClick={() => {}} />;', errors: [expectedError] },
  { code: '<div role="table" onClick={() => {}} />;', errors: [expectedError] },
  { code: '<div role="tabpanel" onClick={() => {}} />;', errors: [expectedError] },
  { code: '<div role="term" onClick={() => {}} />;', errors: [expectedError] },
  { code: '<div role="timer" onClick={() => {}} />;', errors: [expectedError] },
  { code: '<div role="tooltip" onClick={() => {}} />;', errors: [expectedError] },
  // Handlers
  { code: '<div role="article" onKeyDown={() => {}} />;', errors: [expectedError] },
  { code: '<div role="article" onKeyPress={() => {}} />;', errors: [expectedError] },
  { code: '<div role="article" onKeyUp={() => {}} />;', errors: [expectedError] },
  { code: '<div role="article" onClick={() => {}} />;', errors: [expectedError] },
  { code: '<div role="article" onLoad={() => {}} />;', errors: [expectedError] },
  { code: '<div role="article" onError={() => {}} />;', errors: [expectedError] },
  { code: '<div role="article" onMouseDown={() => {}} />;', errors: [expectedError] },
  { code: '<div role="article" onMouseUp={() => {}} />;', errors: [expectedError] },
];

const recommendedOptions = configs.recommended.rules[`jsx-a11y/${ruleName}`][1] || {};
ruleTester.run(`${ruleName}:recommended`, rule, {
  valid: [
    ...alwaysValid,
    // All the possible handlers
    { code: '<div role="article" onCopy={() => {}} />;' },
    { code: '<div role="article" onCut={() => {}} />;' },
    { code: '<div role="article" onPaste={() => {}} />;' },
    { code: '<div role="article" onCompositionEnd={() => {}} />;' },
    { code: '<div role="article" onCompositionStart={() => {}} />;' },
    { code: '<div role="article" onCompositionUpdate={() => {}} />;' },
    { code: '<div role="article" onFocus={() => {}} />;' },
    { code: '<div role="article" onBlur={() => {}} />;' },
    { code: '<div role="article" onChange={() => {}} />;' },
    { code: '<div role="article" onInput={() => {}} />;' },
    { code: '<div role="article" onSubmit={() => {}} />;' },
    { code: '<div role="article" onContextMenu={() => {}} />;' },
    { code: '<div role="article" onDblClick={() => {}} />;' },
    { code: '<div role="article" onDoubleClick={() => {}} />;' },
    { code: '<div role="article" onDrag={() => {}} />;' },
    { code: '<div role="article" onDragEnd={() => {}} />;' },
    { code: '<div role="article" onDragEnter={() => {}} />;' },
    { code: '<div role="article" onDragExit={() => {}} />;' },
    { code: '<div role="article" onDragLeave={() => {}} />;' },
    { code: '<div role="article" onDragOver={() => {}} />;' },
    { code: '<div role="article" onDragStart={() => {}} />;' },
    { code: '<div role="article" onDrop={() => {}} />;' },
    { code: '<div role="article" onMouseEnter={() => {}} />;' },
    { code: '<div role="article" onMouseLeave={() => {}} />;' },
    { code: '<div role="article" onMouseMove={() => {}} />;' },
    { code: '<div role="article" onMouseOut={() => {}} />;' },
    { code: '<div role="article" onMouseOver={() => {}} />;' },
    { code: '<div role="article" onSelect={() => {}} />;' },
    { code: '<div role="article" onTouchCancel={() => {}} />;' },
    { code: '<div role="article" onTouchEnd={() => {}} />;' },
    { code: '<div role="article" onTouchMove={() => {}} />;' },
    { code: '<div role="article" onTouchStart={() => {}} />;' },
    { code: '<div role="article" onScroll={() => {}} />;' },
    { code: '<div role="article" onWheel={() => {}} />;' },
    { code: '<div role="article" onAbort={() => {}} />;' },
    { code: '<div role="article" onCanPlay={() => {}} />;' },
    { code: '<div role="article" onCanPlayThrough={() => {}} />;' },
    { code: '<div role="article" onDurationChange={() => {}} />;' },
    { code: '<div role="article" onEmptied={() => {}} />;' },
    { code: '<div role="article" onEncrypted={() => {}} />;' },
    { code: '<div role="article" onEnded={() => {}} />;' },
    { code: '<div role="article" onLoadedData={() => {}} />;' },
    { code: '<div role="article" onLoadedMetadata={() => {}} />;' },
    { code: '<div role="article" onLoadStart={() => {}} />;' },
    { code: '<div role="article" onPause={() => {}} />;' },
    { code: '<div role="article" onPlay={() => {}} />;' },
    { code: '<div role="article" onPlaying={() => {}} />;' },
    { code: '<div role="article" onProgress={() => {}} />;' },
    { code: '<div role="article" onRateChange={() => {}} />;' },
    { code: '<div role="article" onSeeked={() => {}} />;' },
    { code: '<div role="article" onSeeking={() => {}} />;' },
    { code: '<div role="article" onStalled={() => {}} />;' },
    { code: '<div role="article" onSuspend={() => {}} />;' },
    { code: '<div role="article" onTimeUpdate={() => {}} />;' },
    { code: '<div role="article" onVolumeChange={() => {}} />;' },
    { code: '<div role="article" onWaiting={() => {}} />;' },
    { code: '<div role="article" onAnimationStart={() => {}} />;' },
    { code: '<div role="article" onAnimationEnd={() => {}} />;' },
    { code: '<div role="article" onAnimationIteration={() => {}} />;' },
    { code: '<div role="article" onTransitionEnd={() => {}} />;' },
  ]
    .map(ruleOptionsMapperFactory(recommendedOptions))
    .map(parserOptionsMapper),
  invalid: [
    ...neverValid,
  ]
    .map(ruleOptionsMapperFactory(recommendedOptions))
    .map(parserOptionsMapper),
});

const strictOptions = configs.strict.rules[`jsx-a11y/${ruleName}`][1] || {};
ruleTester.run(`${ruleName}:strict`, rule, {
  valid: [
    ...alwaysValid,
  ]
    .map(ruleOptionsMapperFactory(strictOptions))
    .map(parserOptionsMapper),
  invalid: [
    ...neverValid,
    // All the possible handlers
    { code: '<div role="article" onFocus={() => {}} />;', errors: [expectedError] },
    { code: '<div role="article" onBlur={() => {}} />;', errors: [expectedError] },
    { code: '<div role="article" onContextMenu={() => {}} />;', errors: [expectedError] },
    { code: '<div role="article" onDblClick={() => {}} />;', errors: [expectedError] },
    { code: '<div role="article" onDoubleClick={() => {}} />;', errors: [expectedError] },
    { code: '<div role="article" onDrag={() => {}} />;', errors: [expectedError] },
    { code: '<div role="article" onDragEnd={() => {}} />;', errors: [expectedError] },
    { code: '<div role="article" onDragEnter={() => {}} />;', errors: [expectedError] },
    { code: '<div role="article" onDragExit={() => {}} />;', errors: [expectedError] },
    { code: '<div role="article" onDragLeave={() => {}} />;', errors: [expectedError] },
    { code: '<div role="article" onDragOver={() => {}} />;', errors: [expectedError] },
    { code: '<div role="article" onDragStart={() => {}} />;', errors: [expectedError] },
    { code: '<div role="article" onDrop={() => {}} />;', errors: [expectedError] },
    { code: '<div role="article" onMouseEnter={() => {}} />;', errors: [expectedError] },
    { code: '<div role="article" onMouseLeave={() => {}} />;', errors: [expectedError] },
    { code: '<div role="article" onMouseMove={() => {}} />;', errors: [expectedError] },
    { code: '<div role="article" onMouseOut={() => {}} />;', errors: [expectedError] },
    { code: '<div role="article" onMouseOver={() => {}} />;', errors: [expectedError] },
  ]
    .map(ruleOptionsMapperFactory(strictOptions))
    .map(parserOptionsMapper),
});
