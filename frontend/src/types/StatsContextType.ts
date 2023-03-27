import { SummonerMatchesResponse } from "./SummonerMatchesResponse";

export type StatsContextType = {
    summonerName: string;
    isLoading: boolean;
    stats: SummonerMatchesResponse | undefined;

    setSummonerName: (summonerName: string) => void;
    setStats: (stats: SummonerMatchesResponse | undefined) => void;
    setIsLoading: (isLoading: boolean) => void;
};
