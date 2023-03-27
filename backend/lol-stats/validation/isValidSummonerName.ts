export function isValidSummonerName(summonerName: string | undefined): summonerName is string {
    if (typeof summonerName !== 'string') {
        return false;
    }

    return LOL_SUMMONER_NAME_REGEX.test(summonerName);
}

// Just a sample. I don't actually know the requirements for summoner names,
// and they may change in the future.
const LOL_SUMMONER_NAME_REGEX = /^[a-zA-Z0-9_]{3,16}$/;
