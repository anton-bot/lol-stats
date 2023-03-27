import React, { PropsWithChildren, createContext, useContext, useState } from "react";
import { StatsContextType } from "../types/StatsContextType";

const DEFAULT_STATS_CONTEXT: StatsContextType = {
    summonerName: "",
    isLoading: false,
    stats: undefined,

    setSummonerName: () => {},
    setIsLoading: () => {},
    setStats: () => {},
};

const StatsContext = createContext<StatsContextType>(DEFAULT_STATS_CONTEXT);

export const StatsContextProvider: React.FC<PropsWithChildren> = (props) => {
    const [summonerName, setSummonerName] = useState(DEFAULT_STATS_CONTEXT.summonerName);
    const [isLoading, setIsLoading] = useState(DEFAULT_STATS_CONTEXT.isLoading);
    const [stats, setStats] = useState(DEFAULT_STATS_CONTEXT.stats);

    return (
        <StatsContext.Provider value={{
            summonerName,
            setSummonerName,
            isLoading,
            setIsLoading,
            stats,
            setStats,
        }}>
            {props.children}
        </StatsContext.Provider>
    );
}

export function useStatsContext() {
    return useContext(StatsContext);
}
