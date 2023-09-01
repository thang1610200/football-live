import { Match, Team, League, Message, User, Round } from '@prisma/client';

export type FullMatch = Match & {
    league: League,
    homeTeam: Team,
    awayTeam: Team,
    round: Round
}

export type FullMessage = Message & {
    sender: User
}
