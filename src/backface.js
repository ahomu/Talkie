'use strict';

import Bacon from 'baconjs';
import util  from './util';

const ATTR_BACKFACE  = 'backface';
const ATTR_FILTER    = 'backface-filter';

/**
 * @typedef {Object} BackfaceReturns
 * @property {Bacon.Bus} bgImageBus
 * @property {Bacon.Bus} bgFilterBus
 */

/**
 * backface
 *
 * @param {Element} target
 * @returns {BackfaceReturns}
 */
export default function(target) {

  let bgImageBus = new Bacon.Bus();
  let bgFilterBus = new Bacon.Bus();

  // backface image
  bgImageBus
    .map('.getAttribute', ATTR_BACKFACE)
    .map((src) => src ? `url(${src})` : '')
    .onValue(util.styleAssignOf(target, 'background-image'));

  // backface image css filter
  bgFilterBus
    .map('.getAttribute', ATTR_FILTER)
    .onValue(util.styleAssignOf(target, util.stylePrefixDetect('filter')));

  Bacon.fromArray(util.toArray(document.querySelectorAll(`[${ATTR_BACKFACE}]`)))
    .map('.getAttribute', ATTR_BACKFACE)
    .filter((v) => !!v)
    .onValue(util.preloadImg);

  return {
    bgImageBus  : bgImageBus,
    bgFilterBus : bgFilterBus
  };
}
