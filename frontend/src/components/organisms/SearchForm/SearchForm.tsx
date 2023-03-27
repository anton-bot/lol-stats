import { getMatchesByName } from "../../../api/api";
import { useStatsContext } from "../../../state/StatsContext";
import { LolRegion } from "../../../types/LolRegion";
import { Button } from "../../atoms/Button/Button";
import { SummonerNameInput } from "../../atoms/SummonerNameInput/SummonerNameInput"
import './SearchForm.scss';

const HARDCODED_REGION = LolRegion.AMERICA_NORTH;

export const SearchForm = () => {
    const { isLoading, setIsLoading, summonerName, setStats } = useStatsContext();
    const fetchStats = async () => {
        setIsLoading(true);
        setStats(undefined);

        try {
            const response = await getMatchesByName(summonerName, HARDCODED_REGION);
            setStats(response);
        } catch (e) {
            console.error(e);
        }

        setIsLoading(false);
    }

    return (
        <div className="SearchForm">
            <SummonerNameInput />
            <Button disabled={isLoading} onClick={fetchStats}>
                Get Stats
            </Button>
        </div>
    )
}