class GameEvent extends egret.Event {

    public static OPEN_TILE: string = "open_tile"
    public static START_GAME: string = "start_game"

    public open_tile_index = 0

    constructor(type:string, bubbles:boolean=false, cancelable:boolean=false) {
        super(type, bubbles, cancelable);
    }

}