class GameOverButton extends egret.Sprite{
    public constructor(textures:egret.SpriteSheet) {
        super()
        let panel:egret.Bitmap = new egret.Bitmap()
        panel.texture = textures.getTexture("replay")

        let reStartBtn = new egret.Sprite()
        reStartBtn.width = 200
        reStartBtn.height = 103
        reStartBtn.addChild(panel)
        reStartBtn.touchEnabled = true
        this.addChild(reStartBtn)
        reStartBtn.x = (egret.MainContext.instance.stage.stageWidth - this.width) / 2
        reStartBtn.y = egret.MainContext.instance.stage.stageHeight - 200

    }
}