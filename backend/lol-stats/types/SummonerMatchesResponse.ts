import { MatchV5DTOs, SummonerV4DTO } from "twisted/dist/models-dto";

export type SummonerMatchesResponse = {
    summoner: SummonerV4DTO;
    matches: MatchV5DTOs.MatchDto[];
}
