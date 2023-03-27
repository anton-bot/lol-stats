import { FormattedMatch } from "../../../types/SummonerMatchesResponse"
import "./Match.scss";

type Props = {
    summoner: {
        name: string;
        level: number;
    },
    match: FormattedMatch;
};

export const Match = (props: Props) => {
    const { match } = props;
    return (
        <div className="Match">
            <div className="champion">
                <div>{match.championName}</div>
                <img src={getChampionAvatar(match.championName)} />
            </div>
            <div>{match.win ? 'Won' : 'Lost'}</div>
            <div className="kda">
                <div>K / D / A</div>
                <div>{match.kills} / {match.deaths} / {match.assists}</div>
            </div>
            <div>
                {Math.round(match.duration / 60)} minutes
            </div>
        </div>
    )
}

function getChampionAvatar(championName: string) {
    return `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championName}_0.jpg`;
}
