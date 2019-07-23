class DataManager {

    private constructor() {
        // if (!DataManager._isInit)
        this._catAI = new CatAI()
        this.createData()
    }

    public stepNum = 0

    private _catDefaultIndex: number = 40
    private _catIndex = 0
    public _isFinish = false
    public _isSuccess = false//游戏结果
    //动作状态
    public static catIsStay = true

    private _catAI:CatAI

    private static _dataManager: DataManager

    public static instance(): DataManager {
        if (!DataManager._dataManager) {
            DataManager._dataManager = new DataManager()
        }
        return DataManager._dataManager
    }

    private tileNum = 81
    //记录格子的状态 true 可以走 false 不能走
    private _tileData: Array<boolean> = []

    public createData() {
        for(let i=0; i<this.tileNum; i++) {
            this._tileData.push(true)
        }
    }

    public initTileData() {
        console.log("initTileData")
        this._catDefaultIndex = 40
        for(let i=0; i<this.tileNum; i++) {
            this._tileData[i] = true
        }
    }

    public selectTile() {
        console.log("selectTile")
        let num = Math.floor(Math.random() * 25)
        for(let i=0; i<num; i++) {
            let index = Math.floor(Math.random() * this.tileNum)
            this._tileData[index] = false
        }
        this._tileData[40] = true
        // console.log(this._tileData)
    }

    public createCatPoint() {
        this._catIndex = this._catDefaultIndex
    }

    public closeTileByIndex(index) {
        this._tileData[index] = false
    }

    public getStatusByIndex(index) {
        return this._tileData[index]
    }

    public getCatIndex() {
        return this._catIndex
    }

    /**
     * true 还能行走
     */
    public isHaveNextPointByCat():boolean {
        if (this._catAI.isExit(this._catIndex)) {
            this._isSuccess = false
            return false
        }
        let nextIndex = this._catAI.findNextPoint(this._catIndex)
        if (nextIndex == null) {
            DataManager.catIsStay = false
            this._catIndex = this._catAI.getNear(this._catIndex)
            if (this._catIndex) {
                return true
            }
            this._isSuccess = true
            return false
        }
        if (nextIndex == -1) {
            this._isSuccess = true
            return false
        }
        this._catIndex = nextIndex
        return true
    }
}