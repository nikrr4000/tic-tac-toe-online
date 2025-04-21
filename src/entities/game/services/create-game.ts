import { GameStatus, Prisma } from "@/generated/prisma";
import { GameIdleEntity } from "../domain";
import { gameRepository } from "../repositories/game";

export async function createGame (): Promise<GameIdleEntity[]> {
    const games = await gameRepository.gamesList({
        status: "idle"
    })

    return games as GameIdleEntity[]
}