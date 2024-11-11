import { _decorator, Component, Node, tween, v3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('test3')
export class test3 extends Component {

    @property(Node)
    private btnPlay: Node = null;

    onBtnShow() {
        this.btnPlay.scale = v3(0, 0, 1);
        tween(this.btnPlay)
            .to(0.05, { scale: v3(0.5, 0.5, 1), angle: -5 })
            .to(0.05, { scale: v3(1.3, 1.0, 1), angle: 5 })
            .to(0.05, { scale: v3(0.8, 1.2, 1), angle: -2 })
            .to(0.03, { scale: v3(1.2, 0.9, 1), angle: 2 })
            .to(0.03, { scale: v3(0.8, 1.2, 1), angle: -2 })
            .to(0.03, { scale: v3(1.1, 0.9, 1), angle: 2 })
            .to(0.02, { scale: v3(1, 1, 1), angle: 1 })
            .to(0.02, { scale: v3(1, 1, 1), angle: 0 })
            .start();
    }
}