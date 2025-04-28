import { GameId, UserId } from "@/kernel/ids";

export type GameEntity = 
    GameIdleEntity | 
    GameInProgressEntity | 
    GameOverEntity | 
    GameOveDrawEntity

export type GameIdleEntity = {
    id: GameId;
    creator: PlayerEntity;
    field: Field
    status: 'idle'
}

export type GameInProgressEntity = {
    id: GameId;
    players: PlayerEntity[];
    field: Field
    status: 'inProgress'
};

export type GameOverEntity = {
    id: GameId;
    players: PlayerEntity[];
    field: Field
    status: 'gameOver'
    winner: PlayerEntity
};

export type GameOveDrawEntity = {
    id: GameId;
    players: PlayerEntity[];
    field: Field
    status: 'gameOverDraw'
};


export type PlayerEntity = {
    id:UserId;
    login: string;
    rating: number;
}

export type Field = (Cell | null)[];
export type Cell = GameSymbol | null
export type GameSymbol = string

export const GameSymbol = {
    X: "X",
    O: "0"
}

export const getGameCurrentStep = (game: GameInProgressEntity | GameOverEntity | GameOveDrawEntity) => {
    const symbolIds = game.field.filter(s => s !== null).length

    return symbolIds % 2 === 0 ? GameSymbol.X : GameSymbol.O
}

export const getNextSymbol = (gameSymbol: GameSymbol) => {
    if (gameSymbol === GameSymbol.X) {
        return GameSymbol.O
    }
    return GameSymbol.X
}