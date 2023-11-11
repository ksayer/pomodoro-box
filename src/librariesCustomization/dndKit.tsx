import {MouseEvent, TouchEvent} from "react";
import {MouseSensor, TouchSensor} from "@dnd-kit/core";


const handler = ({ nativeEvent: event }: MouseEvent | TouchEvent) => {
  let cur = event.target as HTMLElement;
  while (cur) {
    if (cur.dataset && cur.dataset.noDnd === 'true') {
      return false;
    }
    cur = cur.parentElement as HTMLElement;
  }
  return true;
};

export class CustomMouseSensor extends MouseSensor {
  static activators = [{ eventName: 'onMouseDown', handler }] as typeof MouseSensor['activators'];
}

export class CustomTouchSensor extends TouchSensor {
  static activators = [{ eventName: 'onTouchStart', handler }] as typeof TouchSensor['activators'];
}
