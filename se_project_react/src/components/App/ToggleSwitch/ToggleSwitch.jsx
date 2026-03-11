import { useContext } from "react";

import CurrentTemperatureUnitContext from "../../../contexts/CurrentTemperatureUnitContext.jsx";

import "./ToggleSwitch.css";

function ToggleSwitch() {
    const { currentTempUnit = "F", handleTempUnitChange } =
        useContext(CurrentTemperatureUnitContext) || {};

    return (
        <label htmlFor="toggle-switch" className="toggle-switch">
            <input
                type="checkbox"
                id="toggle-switch"
                className="toggle-switch__checkbox"
                onChange={handleTempUnitChange}
                checked={currentTempUnit === "C"}
            />
            <span className="toggle-switch__circle"></span>
            <span className="toggle-switch__value toggle-switch__value_left">
                F
            </span>
            <span className="toggle-switch__value toggle-switch__value_right">
                C
            </span>
        </label>
    );
}
export default ToggleSwitch;
