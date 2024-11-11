import { _decorator, Button, Color, Component, EditBox, EventTarget, instantiate, Label, Node, v2, Vec2 } from 'cc';
import { item } from './item';
import { data } from './data';
const { ccclass, property } = _decorator;

@ccclass('start')
export class start extends Component {

    @property(Node)
    private item: Node = null;
    @property(Label)
    private txtLbl: Label = null;
    @property(Label)
    private tipsLbl: Label = null;

    private targetPos: Vec2 = new Vec2(0, 0);
    private editX: number = -1;
    private editY: number = -1;
    private colorPerArr: number[] = [0.2, 0.2, 0.2, 0.2, 0.2];  // 初始概率
    private colorTxtArr: string[] = ['红色', '绿色', '蓝色', '黄色', '黑色'];  // 初始概率
    private colorArr: Color[][] = [];
    private allItems: item[][] = [];

    protected onLoad(): void {
        data.eventTarget.on('itemClick', this.onItemClick, this);
        this.showTxtLabel();
    }

    onItemClick(pos: Vec2) {
        console.log(pos);
        if (pos.x <= 1 && pos.y <= 1) {
            this.tipsLbl.string = 'tips:目标点横向和纵向都应该大于1';
        } else {
            this.targetPos = v2(pos.x-1, pos.y-1);
            this.makeTwoColor();
            this.makeLeftColor();
            this.showAllLblColor();
            this.showTxtLabel();
        }
    }

    // 生成目标点下方，和左方的点的颜色
    makeTwoColor() {
        let arr: number[] = [];
        for (let idx = 0; idx < 2; idx++) {
            let rand = Math.floor(Math.random() * Date.now() % 5);
            arr.push(rand);
        }
        // 预先设置好的颜色
        this.colorArr[this.targetPos.x - 1] = [];
        this.colorArr[this.targetPos.x - 1][this.targetPos.y] = data.instance.colorArr[arr[0]];
        this.colorArr[this.targetPos.x] = [];
        this.colorArr[this.targetPos.x][this.targetPos.y - 1] = data.instance.colorArr[arr[1]];

        console.log(arr);
        if (arr[0] == arr[1]) { // 如果两个颜色相同
            this.colorPerArr[arr[0]] += (this.editY / 100);
            let percent = (1 - this.colorPerArr[arr[0]]) / 4
            console.log(percent);
            // 剩余四个颜色概率的赋值
            for (let idx = 0; idx < 5; idx++) {
                if (idx == arr[0]) continue;
                this.colorPerArr[idx] = percent;
            }
        } else {
            this.colorPerArr[arr[0]] += (this.editX / 100);
            this.colorPerArr[arr[1]] += (this.editX / 100);
            let percent = (1 - this.colorPerArr[arr[0]] * 2) / 3
            console.log(percent);
            // 剩余四个颜色概率的赋值
            for (let idx = 0; idx < 5; idx++) {
                if (idx == arr[0] || idx == arr[1]) continue;
                this.colorPerArr[idx] = percent;
            }
        }
    }

    makeLeftColor() {
        for (let idx = 0; idx < 10; idx++) {
            for (let jdx = 0; jdx < 10; jdx++) {
                if (!this.colorArr[idx]) this.colorArr[idx] = [];
                if (!this.colorArr[idx][jdx]) {
                    let rand = Math.floor(Math.random() * Date.now() % 100);
                    this.colorArr[idx][jdx] = this.makeRealColor(rand);
                }
            }
        }
    }

    makeRealColor(rand) {
        rand = rand / 100;
        for (let idx = 0; idx < 5; idx++) {
            rand -= this.colorPerArr[idx];
            if (rand <= 0) {
                return data.instance.colorArr[idx];
            }
        }
    }

    showAllLblColor() {
        for (let idx = 0; idx < 10; idx++) {
            for (let jdx = 0; jdx < 10; jdx++) {
                this.allItems[idx][jdx].showItemColor(this.colorArr[idx][jdx]);
            }
        }
    }

    // 显示txt文本的概率
    showTxtLabel() {
        let str = ''
        for (let idx = 0; idx < this.colorTxtArr.length; idx++) {
            let txtColor = this.colorTxtArr[idx];
            str += txtColor + ':' + this.colorPerArr[idx] * 100 + '%  ';
        }
        this.txtLbl.string = str;
    }

    initAllBtns() {
        for (let idx = 0; idx < 10; idx++) {
            for (let jdx = 0; jdx < 10; jdx++) {
                let node = instantiate(this.item);
                node.setPosition(jdx * 70 - 250, -idx * 50 + 200, 0);
                node.parent = this.node;
                let btnItem = node.getComponent(item);
                btnItem.showBtnView(idx + 1, jdx + 1);
                if (!this.allItems[idx]) this.allItems[idx] = [];
                this.allItems[idx][jdx] = btnItem;
                node.active = true;
            }
        }
    }

    onEditBox0Return(editBox: EditBox) {
        this.editX = parseInt(editBox.string);

    }

    onEditBox1Return(editBox: EditBox) {
        this.editY = parseInt(editBox.string);
    }

    onBtnMake() {
        if (this.editX >= 0 && this.editY >= 0) {
            this.initAllBtns();
        } else {
            this.tipsLbl.string = 'tips:请先填入x,y的值';
        }
    }
}