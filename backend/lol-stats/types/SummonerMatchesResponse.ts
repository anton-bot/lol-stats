export type SummonerMatchesResponse = {
    summoner: {
        name: string;
        level: number;
    };
    matches: FormattedMatch[];
}

export type FormattedMatch = {
    matchId: string;
    duration: number;
    kills: number;
    deaths: number;
    assists: number;
    win: boolean;
    championName: string;
    start: number;
};
