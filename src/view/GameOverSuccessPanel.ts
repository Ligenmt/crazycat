class GameOverSuccessPanel extends egret.Sprite{
    public constructor(textures:egret.SpriteSheet) {
        super()
        let panel:egret.Bitmap = new egret.Bitmap()
        panel.texture = textures.getTexture("victory")
        this.addChild(panel)
        this.width = 448
        this.height = 338
        this.x = (egret.MainContext.instance.stage.stageWidth - this.width) / 2
        this.y = (egret.MainContext.instance.stage.stageHeight - this.height) / 2
    }
}