import api from './api';
import { Regions } from 'twisted/dist/constants/regions';
import { SummonerV4DTO } from 'twisted/dist/models-dto';

export async function getSummonerByName(summonerName: string, region: Regions): Promise<SummonerV4DTO> {
    return (await api.Summoner.getByName(summonerName, region)).response;
}
