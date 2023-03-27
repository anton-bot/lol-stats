import { Button } from "../../atoms/Button/Button";
import { SummonerNameInput } from "../../atoms/SummonerNameInput/SummonerNameInput"
import './SearchForm.scss';

export const SearchForm = () => {
    return (
        <div className="SearchForm">
            <SummonerNameInput />
            <Button disabled={false} onClick={() => {}}>
                Get Stats
            </Button>
        </div>
    )
}