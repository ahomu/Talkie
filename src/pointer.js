'use strict';

import Bacon from 'baconjs';
import util  from './util';

/**
 * @typedef {Object} PointerReturns
 * @property {Bacon.Bus} coordBus
 * @property {Bacon.Bus} toggleBus
 */

/**
 * pointer mode
 *
 * @param {Element} target
 * @returns {PointerReturns}
 */
export default function(target) {

  let coordBus  = new Bacon.Bus();
  let toggleBus = new Bacon.Bus();

  let x = coordBus.map((e) => e.x + 'px');
  let y = coordBus.map((e) => e.y + 'px');

  x.onValue(util.styleAssignOf(target, 'left'));
  y.onValue(util.styleAssignOf(target, 'top'));

  toggleBus
    .scan(false, (acc) => !acc)
    .map((bool) => bool ? 'visible' : 'hidden')
    .onValue(util.styleAssignOf(target, 'visibility'));

  return {
    coordBus  : coordBus,
    toggleBus : toggleBus
  };
}
