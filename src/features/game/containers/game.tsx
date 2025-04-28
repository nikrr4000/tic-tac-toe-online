"use client"
import { GameId } from "@/kernel/ids";
import { GameLayout } from "../ui/layout";
import { GamePlayers } from "../ui/players";
import { GameDomain } from "@/entities/game";
import { GameStatus } from "../ui/status";
import { GameField } from "../ui/field";
import { useEventsSource } from "@/shared/lib/sse/client";

export function Game ({gameId}: {gameId: GameId}) {
    const {dataStream, error}= useEventsSource(`/game/${gameId}/stream`, 1)


    const game: GameDomain.GameInProgressEntity = {
        id: '1',
        players:[
            {
                id: "1",
                login: "test1",
                rating: 1000
            },
            {
                id: "2",
                login: "test2",
                rating: 100
            },
        ],
        status: "inProgress",
        field: [null, null, null, "0", "X", "X", null, null, null]
    }

    return <GameLayout
        players={<GamePlayers game={game}/>}
        status={<GameStatus game={game}/>}
        field={<GameField game={game}/>}
    />
}