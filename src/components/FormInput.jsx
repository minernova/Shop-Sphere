import React from "react";

export default function FormInput({ label, name, type, defaultValue }) {
  return (
    <div>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">{label}</span>
        </div>
        <input
          type={type}
          placeholder={defaultValue}
          name={name}
          required
          className="input input-bordered w-full max-w-xs"
        />
      </label>
    </div>
  );
}
