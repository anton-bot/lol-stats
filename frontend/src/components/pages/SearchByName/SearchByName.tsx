import { Header } from "../../atoms/Header/Header"
import { Results } from "../../organisms/Results/Results";
import { SearchForm } from "../../organisms/SearchForm/SearchForm";

export const SearchByName = () => {
    return (
        <div className="SearchByName">
            <Header />
            <SearchForm />
            <Results />
        </div>
    )
};
