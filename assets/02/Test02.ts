import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Test02')
export class Test02 extends Component {

    private arra = [10, 40, 5, 280];
    private arrb = [234, 5, 2, 148, 23];
    private v = 42;
    onLoad() {
        this.calculateTest();
    }

    // 时间复杂度是 O(n×m) n和m分别是数组a和b的长度
    calculateTest() {
        for (let idx = 0; idx < this.arra.length; idx++) {
            let aval = this.arra[idx];
            let diff = this.v - aval;
            for (let jdx = 0; jdx < this.arrb.length; jdx++) {
                let bval = this.arrb[jdx];
                if( bval == diff) {
                    console.log(`Found ${aval} and ${bval}`);
                    return true;
                }
            }
        }
        return false;
    }
}