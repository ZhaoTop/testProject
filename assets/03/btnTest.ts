import { _decorator, Color, Component, Node, Sprite, tween, v3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('btnTest')
export class btnTest extends Component {
    onLoad() {
        this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    onTouchStart(event: Event) {
        this.node.getComponent(Sprite).color = new Color().fromHEX('#525252');
        tween(this.node)
            .to(0.08, {scale: v3(0.6, 0.6, 1)})
            .to(0.08, {scale: v3(0.9, 0.9, 1)})
            .to(0.07, {scale: v3(0.7, 0.7, 1)})
            .to(0.07, {scale: v3(0.85, 0.85, 1)})
            .to(0.05, {scale: v3(0.75, 0.75, 1)})
            .to(0.05, {scale: v3(0.8, 0.8, 1)})
            .start();
    }

    onTouchEnd(event: Event) {
        this.node.getComponent(Sprite).color = new Color().fromHEX('#ffffff');
        tween(this.node)
            .to(0.08, {scale: v3(1.3, 1.3, 1)})
            .to(0.08, {scale: v3(1, 1, 1)})
            .to(0.07, {scale: v3(1.2, 1.2, 1)})
            .to(0.07, {scale: v3(1, 1, 1)})
            .to(0.06, {scale: v3(1.1, 1.1, 1)})
            .to(0.06, {scale: v3(1, 1, 1)})
            .to(0.05, {scale: v3(1.05, 1.05, 1)})
            .to(0.05, {scale: v3(1, 1, 1)})
            .start();
    }
}