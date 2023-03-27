import { useStatsContext } from "../../../state/StatsContext"
import './SummonerNameInput.scss';

export const SummonerNameInput = () => {
    const { summonerName, setSummonerName } = useStatsContext();

    return (
        <div className="SummonerNameInput">
            <input
                type="text"
                placeholder="Summoner name"
                value={summonerName}
                onChange={(e) => setSummonerName(e.currentTarget.value)}
            />
        </div>
    )
}
