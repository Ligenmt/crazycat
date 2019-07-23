class ViewManager extends egret.EventDispatcher{ //具备发送事件能力

    private _rootView:egret.DisplayObjectContainer

    private _textures:egret.SpriteSheet
    //背景
    private _backgroundPanel:BackgroundPanel
    //开始游戏面板
    private _startGamePanel:StartGamePanel
    //游戏成功面板
    private _gameOverSuccess:GameOverSuccessPanel
    //游戏失败面板
    private _gameOverFailPanel:GameOverFailPanel
    //游戏结束按钮
    private _gameOverButton:GameOverButton

    public constructor(root:egret.DisplayObjectContainer, textures: egret.SpriteSheet) {
        super()
        this._rootView = root
        this._textures = textures

        this._backgroundPanel = new BackgroundPanel(root, textures)
        this._startGamePanel = new StartGamePanel(textures)

        this._startGamePanel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartGameClick, this)

        this._gameOverSuccess = new GameOverSuccessPanel(textures)
        this._gameOverFailPanel = new GameOverFailPanel(textures)

        this._gameOverButton = new GameOverButton(textures)
        this._gameOverButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRestartClick, this)
        this.showStartGameView()
    }

    public _cat:Cat
    private createCat() {
        this._cat = new Cat("cat");
    }

    private showStartGameView() {
        if (this._startGamePanel) {
            // console.log("showStartGameView")
            this._rootView.addChild(this._startGamePanel)
        }
    }

    private onStartGameClick() {
        this._rootView.removeChild(this._startGamePanel)
        this._startGamePanel.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartGameClick, this)

        this.createTiles()
        this.showTiles()
        this.createCat()
        let evt:GameEvent = new GameEvent(GameEvent.START_GAME)
        this.dispatchEvent(evt)
    }

    private onRestartClick() {
        if(this._gameOverSuccess.parent) {
            this._rootView.removeChild(this._gameOverSuccess)
        } else {
            this._rootView.removeChild(this._gameOverFailPanel)
        }
        this._rootView.removeChild(this._gameOverButton)
        let evt:GameEvent = new GameEvent(GameEvent.START_GAME)
        this.dispatchEvent(evt)
    }

    private _tiles:Array<Tile> = []

    private createTiles() {
        let len = 81
        for (let i=0; i<len; i++) {
            var tile = new Tile(this._textures, i)
            tile.index = i
            this._tiles.push(tile)
            tile.addEventListener(GameEvent.OPEN_TILE, this.onOpenTile, this)
        }
    }

    private onOpenTile(event:GameEvent) {
        this.dispatchEvent(event)
    }

    private showTiles() {
        let len = 81
        for (let i=0; i<len; i++) {
            let p:egret.Point = Util.getPointXYByIndex(this._tiles[i].index)
            this._tiles[i].x = p.x
            this._tiles[i].y = p.y
            this._rootView.addChild(this._tiles[i])
        }
    }

    public updateAll() {
        console.log("updateAll")
        for (let i = 0; i < 81; i++) {
           if (DataManager.instance().getStatusByIndex(i)) {
               this._tiles[i].open()
           } else {
               this._tiles[i].closeTile()
           }
        }
        if (this._cat.parent == null) {
            this._rootView.addChild(this._cat)
        }
        DataManager.catIsStay = true
        this._cat.init()
        this.update()
    }

    public update() {
        // console.log("update", DataManager.instance().getCatIndex())
        let p = Util.getPointXYByIndex(DataManager.instance().getCatIndex())
        this._cat.x = p.x
        this._cat.y = p.y
        this._cat.isActionStay = DataManager.catIsStay

    }

    public showGameOverView(isS:boolean) {
        if (isS) {
            this._rootView.addChild(this._gameOverSuccess)
        } else {
            this._rootView.addChild(this._gameOverFailPanel)
        }
        this._rootView.addChild(this._gameOverButton)
    }
}