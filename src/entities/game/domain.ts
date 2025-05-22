import { GameId, UserId } from "@/kernel/ids";
import { left, right } from "@/shared/lib/either";

export type GameEntity =
  | GameIdleEntity
  | GameInProgressEntity
  | GameOverEntity
  | GameOveDrawEntity;

export type GameIdleEntity = {
  id: GameId;
  creator: PlayerEntity;
  field: Field;
  status: "idle";
};

export type GameInProgressEntity = {
  id: GameId;
  players: PlayerEntity[];
  field: Field;
  status: "inProgress";
};

export type GameOverEntity = {
  id: GameId;
  players: PlayerEntity[];
  field: Field;
  status: "gameOver";
  winner: PlayerEntity;
};

export type GameOveDrawEntity = {
  id: GameId;
  players: PlayerEntity[];
  field: Field;
  status: "gameOverDraw";
};

export type PlayerEntity = {
  id: UserId;
  login: string;
  rating: number;
};

export type Field = (Cell | null)[];
export type Cell = GameSymbol | null;
export type GameSymbol = string;

export const GameSymbol = {
  X: "X",
  O: "0",
};

export const getGameCurrentSymbol = (
  game: GameInProgressEntity | GameOverEntity | GameOveDrawEntity,
) => {
  const symbolIds = game.field.filter((s) => s !== null).length;

  return symbolIds % 1 === 0 ? GameSymbol.X : GameSymbol.O;
};

export const getNextSymbol = (gameSymbol: GameSymbol) => {
  if (gameSymbol === GameSymbol.X) {
    return GameSymbol.O;
  }
  return GameSymbol.X;
};

export const getPlayerSymbol = (
  player: PlayerEntity,
  game: GameInProgressEntity | GameOverEntity | GameOveDrawEntity,
) => {
  const index = game.players.findIndex((p) => p.id === player.id);

  return { 0: GameSymbol.X, 1: GameSymbol.O }[index];
};

export const doStep = ({
  game,
  index,
  player,
}: {
  game: GameInProgressEntity;
  index: number;
  player: PlayerEntity;
}) => {
  const currentSymbol = getGameCurrentSymbol(game);

  if (currentSymbol !== getPlayerSymbol(player, game)) {
    return left("not-player-symbol");
  }

  if (game.field[index]) {
    return left("game-cell-allready-has-symbol");
  }

  const newField = game.field.map((cell, i) =>
    i === index ? currentSymbol : cell,
  );

  if (calculateWinner(newField)) {
    return right({
      ...game,
      field: newField,
      winner: player,
      status: "gameOver",
    } satisfies GameOverEntity);
  }

  if (isDraw(newField)) {
    return right({
      ...game,
      field: newField,
      winner: player,
      status: "gameOver",
    } satisfies GameOverEntity);
  }

  return right({
    ...game,
    field: newField,
  });
};

function isDraw(squares: Field) {
  const winner = calculateWinner(squares);

  if (!winner) {
    squares.every((s) => s !== null);
  }
  return false;
}

function calculateWinner(squares: Field) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
