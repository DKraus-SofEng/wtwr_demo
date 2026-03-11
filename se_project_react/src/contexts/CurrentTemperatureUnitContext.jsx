import {
    createContext,
    useContext,
    useMemo,
    useState,
} from "react";

const CurrentTemperatureUnitContext = createContext();

export function useCurrentTemperatureUnit() {
    const ctx = useContext(CurrentTemperatureUnitContext) || {};
    const { currentTempUnit = "F", handleTempUnitChange = () => {} } = ctx;
    return { currentTempUnit, handleTempUnitChange };
}

export function CurrentTemperatureUnitProvider({ children }) {
    const [currentTempUnit, setCurrentTempUnit] = useState("F");
    const handleTempUnitChange = () =>
        setCurrentTempUnit((u) => (u === "F" ? "C" : "F"));

    const value = useMemo(
        () => ({ currentTempUnit, handleTempUnitChange }),
        [currentTempUnit]
    );

    return (
        <CurrentTemperatureUnitContext.Provider value={value}>
            {children}
        </CurrentTemperatureUnitContext.Provider>
    );
}

export default CurrentTemperatureUnitContext;
