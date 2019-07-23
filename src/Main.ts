
class Main extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private async runGame() {
        await this.loadResource()
    }

    private async loadResource() {
        try {
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupComplete, this)
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("gameres", 0)
        }
        catch (e) {
            console.error(e);
        }
    }

    private _viewManager:ViewManager

    private onGroupComplete() {
        this._viewManager = new ViewManager(this, RES.getRes("gameres_json"))
        this._viewManager.addEventListener(GameEvent.START_GAME, this.startGame, this)
        this._viewManager.addEventListener(GameEvent.OPEN_TILE, this.openTile, this)

        // let cat:Cat = new Cat()
        // cat.x = (egret.MainContext.instance.stage.stageWidth - cat.width) / 2
        // cat.y = (egret.MainContext.instance.stage.stageHeight - cat.height) / 2
        // this.addChild(cat)
        // cat.anchorOffsetX = cat.width / 2
        // cat.anchorOffsetY = cat.height / 2
        // let tile = new Tile(RES.getRes("gameres_json"))
        // tile.x = 50
        // tile.y = 50
        // this.addChild(tile)
    }

    public startGame() {
        console.log("startGame")
        //初始化地图格子
        DataManager.instance().initTileData()
        //随机生成格子
        DataManager.instance().selectTile()
        DataManager.instance().createCatPoint()
        this._viewManager.updateAll()
    }

    public openTile(event:GameEvent) {
        DataManager.instance().stepNum += 1
        DataManager.instance().closeTileByIndex(event.open_tile_index)
        let rel = DataManager.instance().isHaveNextPointByCat()
        if (rel) {
            this._viewManager.update()
        } else {
            this._viewManager.showGameOverView(DataManager.instance()._isSuccess)
        }
    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }


}