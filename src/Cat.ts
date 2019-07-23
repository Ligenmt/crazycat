class Cat extends egret.Sprite {

    private _actionStay:egret.MovieClip
    private _actionWeizhu:egret.MovieClip
    private _name

    private _isActionStay: boolean = true

    public constructor(name:string) {
        super();
        this._name = name
        let data = RES.getRes("stay_json")
        let texture = RES.getRes("stay_png")

        let stayFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, texture);
        this._actionStay = new egret.MovieClip( stayFactory.generateMovieClipData("stay"));

        let weizhuData = RES.getRes("finish_json")
        let weizhuTexture = RES.getRes("finish_png")
        let weizhuFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(weizhuData, weizhuTexture);
        this._actionWeizhu = new egret.MovieClip( weizhuFactory.generateMovieClipData("finish"));

        this._actionStay.play(-1)
        this._actionWeizhu.play(-1)
        this.playAction()
        this.anchorOffsetY = this.height -20
        // console.log("height:", this.height)
    }

    public init() {
        console.log("cat init")
        this._isActionStay = true
        this.playAction()
    }

    public playAction() {
        // console.log("playAction", this._name, this.numChildren, this._isActionStay)
        if (this.numChildren > 0) {
            this.removeChildAt(0)
        }
        console.log("playAction", this._isActionStay)
        if (this._isActionStay) {
            this.addChild(this._actionStay)
        } else {
            this.addChild(this._actionWeizhu)
        }
    }

    public get isActionStay(): boolean {
        return this._isActionStay
    }
    public set isActionStay(val:boolean) {
        if (val == this._isActionStay) {
            return
        }
        this._isActionStay = val
        this.playAction()
    }
}