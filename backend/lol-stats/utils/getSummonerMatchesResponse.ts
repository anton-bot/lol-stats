import { MatchV5DTOs, SummonerV4DTO } from "twisted/dist/models-dto";
import { FormattedMatch, SummonerMatchesResponse } from "../types/SummonerMatchesResponse";

export function getSummonerMatchesResponse(summoner: SummonerV4DTO, matches: MatchV5DTOs.MatchDto[]): SummonerMatchesResponse {
    // TODO: return asset URLs for summoner icon and match champions
    return {
        summoner: {
            name: summoner.name,
            level: summoner.summonerLevel,
        },
        matches: matches
            .map((match) => matchFormatter(match, summoner.puuid))
            .sort((a, b) => b.start - a.start)
    };
}

function matchFormatter(match: MatchV5DTOs.MatchDto, puuid: string): FormattedMatch {
    const summonerStats = match.info.participants.find((participant) => participant.puuid === puuid);

    if (!summonerStats) {
        throw new Error('Unable to find summoner stats in match');
    }

    return {
        matchId: match.metadata.matchId,
        start: match.info.gameStartTimestamp,
        duration: match.info.gameDuration,
        kills: summonerStats.kills,
        deaths: summonerStats.deaths,
        assists: summonerStats.assists,
        win: summonerStats.win,
        championName: summonerStats.championName,
    }
}