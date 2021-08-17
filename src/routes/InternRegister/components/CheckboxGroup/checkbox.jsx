import React from "react";

export function Checkbox({ name, label, checked, index, onChange }) {
  function handleCheck() {
    onChange(index);
  }
  return (
    <div style={{ marginLeft: "16px", display: "flex", alignItems: "center" }}>
      <label>
        <input
          name={name}
          type="checkbox"
          checked={checked}
          onChange={handleCheck}
        />
        <span>{label}</span>
      </label>
    </div>
  );
}
