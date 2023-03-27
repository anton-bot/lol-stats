import api from "./api";
import { Regions, regionToRegionGroup } from "twisted/dist/constants";

const DEFAULT_MATCH_COUNT = 5;

export async function getMatchList(summonerPuuid: string, region: Regions, count: number = DEFAULT_MATCH_COUNT) {
    return (await api.MatchV5.list(
        summonerPuuid,
        regionToRegionGroup(region),
        { count },
    )).response;
}
