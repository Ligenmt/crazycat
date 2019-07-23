class CatAI {

    private map:Array<CatNode>
    public initMap() {
        if (this.map == null) {
            this.map = []
            for (let i=0; i<81; i++) {
                this.map.push(new CatNode())
            }
        }
        for (let i=0; i<81; i++) {
            this.map[i].clean()
            if (DataManager.instance().getStatusByIndex(i) == false) {
                this.map[i]._isUsed = true
            }
        }
    }

    public findPath(from:number):number {
        let currentNodeIndexArray:Array<number> = [from] //待检测的中心点
        let usedNodeIndexArray:Array<number> = []   //查找过的可以移动至的点
        let currentNodeIndex:number
        let round:Array<number>  //当前点周围可以走的点
        let rel = true
        let first = true
        while (rel) {
            if (currentNodeIndexArray.length == 0) {
                //没有能达到边界
                console.log("没有能达到边界")
                rel = false
                return null
            }
            let newIndexArray:Array<number> = []
            let l = currentNodeIndexArray.length
            for (let j = 0; j < l; j++) {
                currentNodeIndex = currentNodeIndexArray.shift() //依次取出中心点
                round = this.findRound(currentNodeIndex) //周围可以走的点
                // console.log("中心点", currentNodeIndex, " 周围可以走的点:", round, this.map)
                for (let i = 0; i < round.length; i++) {
                    // console.log(round, currentNodeIndex, round[i], this.map[round[i]])
                    if (this.map[round[i]]._isUsed) {
                        usedNodeIndexArray.push(round[i])
                    }
                    if (usedNodeIndexArray.indexOf(round[i]) > -1 || currentNodeIndexArray.indexOf(round[i]) > -1) {
                        continue
                    }
                    this.map[round[i]].preIndex = currentNodeIndex
                    if (this.isExit(round[i])) {
                        //到达边界
                        console.log("到达边界", round[i])
                        return round[i]
                    }
                    newIndexArray.push(round[i])
                }
                usedNodeIndexArray.push(currentNodeIndex)
            }
            //newIndexArray中的点就是下一轮要检测的中心点
            currentNodeIndexArray = newIndexArray
        }

    }

    public findNextPoint(catIndex:number):number {
        this.initMap()
        let nextIndex = this.findPath(catIndex)
        if (nextIndex == null) {
            //已经被围住，但还可以走
            return null
        }
        if (nextIndex == -1) {
            //没有可移动的点
            return -1
        }
        let rel = true
        let preindex:number
        while (rel) {
            preindex = this.map[nextIndex].preIndex
            if (preindex != catIndex && preindex != -1) {
                nextIndex = preindex
            } else {
                rel = false
            }
        }
        return nextIndex

    }

    public isExit(index:number): boolean {
        let p = Util.getPointByIndex(index)
        return p.y == 0 || p.y == 8 || p.x == 0 || p.x == 8;
    }

    public getNear(catIndex:number):number {
        let arr = this.findRound(catIndex);
        return arr[0]
    }



    //寻找周围6格可以移动的格子
    public findRound(from:number):Array<number> {
        let arr:Array<number> = []
        //获取行和列
        let p = Util.getPointByIndex(from)
        let row = p.y
        let col = p.x

        let left = col - 1

        //左边点
        let leftP = new egret.Point(left, row)
        if (left >= 0 && this.map[Util.getIndexByPoint(leftP)]._isUsed == false) {
            arr.push(Util.getIndexByPoint(leftP))
        }
        //右边点
        let right = col + 1
        let rightP = new egret.Point(right, row)
        if (right < 9 && this.map[Util.getIndexByPoint(rightP)]._isUsed == false) {
            arr.push(Util.getIndexByPoint(rightP))
        }
        //上边点
        let top = row - 1
        let topP = new egret.Point(col, top)
        if (top >= 0 && this.map[Util.getIndexByPoint(topP)]._isUsed == false) {
            arr.push(Util.getIndexByPoint(topP))
        }
        //下边点
        let bottom = row + 1
        let bottomP = new egret.Point(col, bottom)
        if (bottom < 9 && this.map[Util.getIndexByPoint(bottomP)]._isUsed == false) {
            arr.push(Util.getIndexByPoint(bottomP))
        }
        //判断奇偶行
        if (row % 2 != 0) {
            //偶数行，取右上右下
            if (top >= 0 && right < 9 && this.map[Util.getIndexByPoint(new egret.Point(right, top))]._isUsed == false) {
                arr.push(Util.getIndexByPoint(new egret.Point(right, top)))
            }
            if (bottom < 9 && right < 9 && this.map[Util.getIndexByPoint(new egret.Point(right, bottom))]._isUsed == false) {
                arr.push(Util.getIndexByPoint(new egret.Point(right, bottom)))
            }
        } else {
            //奇数行，取左上左下
            if (top >= 0 && left < 9 && this.map[Util.getIndexByPoint(new egret.Point(left, top))]._isUsed == false) {
                arr.push(Util.getIndexByPoint(new egret.Point(left, top)))
            }
            if (bottom < 9 && left < 9 && this.map[Util.getIndexByPoint(new egret.Point(left, bottom))]._isUsed == false) {
                arr.push(Util.getIndexByPoint(new egret.Point(left, bottom)))
            }
        }
        arr = arr.sort()
        return arr
    }

}