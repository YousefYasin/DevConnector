import React from "react";
import PropTypes from "prop-types";
const SelectListFieldGroup = ({
  name,
  value,
  info,
  onChange,
  options,
}) => {
  const selectOptions = options.map((option) => (
    <option key={option.lable} value={option.value}>
      {option.lable}
    </option>
  ));
  return (
    <div className="form-group">
      <select
        className="form-control form-control-lg"
        name={name}
        value={value}
        onChange={onChange}
      >
        {selectOptions}
      </select>
      {info && <small className="form-text text-muted">{info}</small>}
    </div>
  );
};
SelectListFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
};

export default SelectListFieldGroup;
