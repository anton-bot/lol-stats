import { MatchV5DTOs, SummonerV4DTO } from "twisted/dist/models-dto";
import { SummonerMatchesResponse } from "../types/SummonerMatchesResponse";

export function getSummonerMatchesResponse(summoner: SummonerV4DTO, matches: MatchV5DTOs.MatchDto[]): SummonerMatchesResponse {
    // TODO: return asset URLs for summoner icon and match champions
    return {
        summoner,
        matches,
    };
}
