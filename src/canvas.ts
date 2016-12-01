/// <reference path="../typings/myself.d.ts" />

'use strict';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { attributeAssignOf }  from './util';
import { DragDeltaLog }  from './control';

interface CanvasOptions {
  canvasElement: HTMLElement;
  color: string;
}

function writeCanvasTo(context: CanvasRenderingContext2D, color: string) {
  return function(log: DragDeltaLog) {
    const {prev, curt} = log;
    const prevX = prev.clientX;
    const prevY = prev.clientY;
    const curtX = curt.clientX;
    const curtY = curt.clientY;

    context.strokeStyle = color;
    context.beginPath();
    context.moveTo(prevX, prevY);
    context.lineTo(curtX, curtY);
    context.lineWidth = 5;
    context.stroke();
    context.closePath();
  }
}

function clearCanvasTo(context: CanvasRenderingContext2D) {
  return function() {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }
}

export default function(options: CanvasOptions) {
  const write  = new Subject<DragDeltaLog>();
  const clear  = new Subject<any>();
  const scale  = new BehaviorSubject<any>(true);
  const toggle = new Subject<any>();

  const canvas  = options.canvasElement as HTMLCanvasElement;
  const context = canvas.getContext("2d");
  if (context === null) {
    throw new TypeError('unreachable: canvas should be not `null`');
  }

  write.subscribe(writeCanvasTo(context, options.color));
  clear.subscribe(clearCanvasTo(context));

  scale
    .map(() => window.innerWidth)
    .subscribe(attributeAssignOf(canvas, 'width'));
  scale
    .map(() => window.innerHeight)
    .subscribe(attributeAssignOf(canvas, 'height'));

  toggle
    .scan((acc) => !acc, false)
    .map((bool) => bool ? 'false' : 'true')
    .subscribe(attributeAssignOf(canvas, 'aria-hidden'));

  return {
    cvWrite  : write,
    cvClear  : clear,
    cvToggle : toggle,
    cvScale  : scale
  };

}
