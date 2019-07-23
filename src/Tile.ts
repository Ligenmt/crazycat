class Tile extends egret.Sprite {

    public index = 0
    private _redSkin: egret.Bitmap
    private _blackSkin: egret.Bitmap
    private text:egret.TextField


    constructor(textures: egret.SpriteSheet, index:number) {
        super();
        this._redSkin = new egret.Bitmap()
        this._redSkin.texture = textures.getTexture("pot2")
        this._blackSkin = new egret.Bitmap()
        this._blackSkin.texture = textures.getTexture("pot1")

        this.width = egret.MainContext.instance.stage.stageWidth / 10
        this.height = egret.MainContext.instance.stage.stageWidth / 10
        this.touchEnabled = true

        this.addChild(this._blackSkin)
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this)

        this.text = new egret.TextField()
        this.text.text = index + ""
        this.addChild(this.text)
    }

    private _isOpen = true

    public getStatus():boolean {
        return this._isOpen
    }

    public open() {
        if (!this._isOpen) {
            this._isOpen = true
            this.removeChild(this._redSkin)
            this.addChildAt(this._blackSkin, 0)
        }
    }

    public closeTile() {
        if (this._isOpen) {
            this._isOpen = false
            this.removeChild(this._blackSkin)
            this.addChildAt(this._redSkin, 0)
        }
    }

    public onClick() {
        if (this.index == DataManager.instance().getCatIndex()) {
            //猫所在点不能点
            return
        }
        if (this._isOpen) {
            //抛出事件
            let evt:GameEvent = new GameEvent(GameEvent.OPEN_TILE)
            evt.open_tile_index = this.index
            this.dispatchEvent(evt)
        }
        this.closeTile()
        console.log("onClick")
    }
}