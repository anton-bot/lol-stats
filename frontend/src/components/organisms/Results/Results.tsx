import { useStatsContext } from "../../../state/StatsContext";
import { Match } from "../../molecules/Match/Match";
import './Results.scss';

export const Results = () => {
    const { stats } = useStatsContext();

    if (!stats) {
        return null;
    }

    return <div className="Results">
        {stats.matches.map(match => <Match key={match.matchId} match={match} summoner={stats.summoner} />)}
    </div>
}