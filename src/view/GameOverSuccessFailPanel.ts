class GameOverFailPanel extends egret.Sprite{
    public constructor(textures:egret.SpriteSheet) {
        super()
        let panel:egret.Bitmap = new egret.Bitmap()
        panel.texture = textures.getTexture("failed")
        this.addChild(panel)
        this.width = 448
        this.height = 361
        this.x = (egret.MainContext.instance.stage.stageWidth - this.width) / 2
        this.y = (egret.MainContext.instance.stage.stageHeight - this.height) / 2

        this.addTextField()
    }

    private tapTextField:egret.TextField
    private rankTextField:egret.TextField

    public addTextField() {
        this.tapTextField = new egret.TextField()
        this.tapTextField.width = 400
        this.tapTextField.textColor = 0xff0000
        this.tapTextField.textAlign = egret.HorizontalAlign.CENTER
        this.tapTextField.text = "你没有抓住神经猫！"
        this.tapTextField.size = 22
        this.tapTextField.x = 10
        this.tapTextField.y = 190
        this.addChild(this.tapTextField)
    }
}