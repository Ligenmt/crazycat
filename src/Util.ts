class Util {
    public static getPointByIndex(index:number):egret.Point {
        let point = new egret.Point()
        point.x = index % 9
        point.y = Math.floor(index / 9)
        return point
    }

    public static getPointXYByIndex(index:number):egret.Point {
        let point = new egret.Point()
        let space = 0
        if (Math.floor(index/9) % 2 == 1) {
            space = 25
        }
        point.x = 30 + egret.MainContext.instance.stage.stageWidth / 10 * (index % 9) + space
        point.y = 370 + egret.MainContext.instance.stage.stageWidth / 10 * Math.floor(index / 9)
        return point
    }

    public static getIndexByPoint(p:egret.Point):number {
        return p.y * 9 + p.x
    }
}