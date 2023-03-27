import { LolRegion } from "../types/LolRegion";
import { SummonerMatchesResponse } from "../types/SummonerMatchesResponse";

const GET_MATCHES_BY_NAME_URL = 'https://nxjjzmhurofxwtrejw4dpdokca0lcios.lambda-url.us-east-1.on.aws/';

export const getMatchesByName = async (summonerName: string, region: LolRegion): Promise<SummonerMatchesResponse> => {
    const response = await fetch(`${GET_MATCHES_BY_NAME_URL}?summoner=${summonerName}&region=${region}`);
    if (!response.ok) {
        throw new Error(`Unable to retrieve matches for summoner ${summonerName} in region ${region}`);
    }
    return response.json();
}
