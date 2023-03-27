import api from "./api";
import { MatchV5DTOs } from "twisted/dist/models-dto";
import { Regions, regionToRegionGroup } from "twisted/dist/constants";

export async function getMatch(matchId: string, region: Regions): Promise<MatchV5DTOs.MatchDto> {
    return (await api.MatchV5.get(matchId, regionToRegionGroup(region))).response;
}
