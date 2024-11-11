import { _decorator, Color, Component, Label, Node, v2, Vec2 } from 'cc';
import { data } from './data';
const { ccclass, property } = _decorator;

@ccclass('item')
export class item extends Component {
    @property(Label)
    private colorLbl: Label = null;

    private vec: Vec2 = v2(0, 0);

    showBtnView(x: number, y: number) {
        this.colorLbl.string = `${x}, ${y}`;
        this.vec = v2(x, y);
    }

    onBtnClick() {
        data.eventTarget.emit('itemClick', this.vec);
    }

    showItemColor(color: Color) {
        this.colorLbl.color = color;
    }
}