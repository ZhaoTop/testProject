import { Color, EventTarget  } from 'cc';

export class data {
    public colorArr: Color[] = [Color.RED, Color.GREEN, Color.BLUE, Color.YELLOW, Color.BLACK];

    private static _eventTarget: EventTarget = null;
    private static _instance: data;
    public static get instance() {
        if (!this._instance) {
            this._instance = new data();
        }
        return this._instance;
    }

    public static get eventTarget() {
        if (!this._eventTarget) {
            this._eventTarget = new EventTarget();
        }
        return this._eventTarget;
    }
}