import { useState, useEffect } from "react";
import ReactSwitch from "react-switch";
import { useAuth } from "../components/context/AuthProvider";

function  SwitchComponent({ isOn, onToggle }) {
  const [checked, setChecked] = useState(isOn);
  const {currentUser} = useAuth();

  useEffect(() => {
    setChecked(isOn);
  }, [isOn]);

  const handleChange = (newChecked) => {
    setChecked(newChecked);
    if (onToggle) {
      onToggle(newChecked);
    }
  };

  return (
    <div className="example">
      <label htmlFor="material-switch">
        <ReactSwitch
          checked={checked}
          onChange={handleChange}
          onColor="#A1FFFF"
          onHandleColor="#EDBAFF"
          handleDiameter={20}
          uncheckedIcon={false}
          checkedIcon={false}
          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
          activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
          height={20}
          width={48}
          className="react-switch"
          id="material-switch"
        />
      </label>
    </div>
  );
}

export default SwitchComponent;