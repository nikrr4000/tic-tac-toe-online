import { getIdleGames } from "@/entities/game/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import {isAsync} from "zod"

export async function GamesList() {
    const games = await getIdleGames()
    
    return (
        <div className="grid grid-cols-2 gap-4">
            {games.map(game => {
                console.log(game.creator)
                return <Card>
                    <CardHeader>
                        <CardTitle key={game.id}>
                            Игра с user {game.creator.login}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                            Рейтинг: {game.creator.rating}
                        </CardContent>
                </Card>
            })}
        </div>
    )
}