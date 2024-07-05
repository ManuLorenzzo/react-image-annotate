export const selectStyles = {
  option: (provided) => ({
    ...provided,
    backgroundColor: "white",
    color: "#333",
    fontWeight: "500",
    "&:hover": {
      backgroundColor: "#ecebeb",
    },
  }),
  control: (provided, { isDisabled }) => ({
    ...provided,
    backgroundColor: isDisabled ? "rgb(236, 235, 235)" : "#fff",
    marginTop: "0.5rem",
    border: "0.15rem solid #a3afa6",
    boxShadow: "none",
    zIndex: 99,
    fontWeight: 500,
    minHeight: "2.9rem",
    borderRadius: "0.4rem",
    "&:hover": {
      border: "0.15rem solid #333",
    },
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "white",
    zIndex: 99,
  }),
  menuPortal: (base) => ({ ...base, zIndex: 999 }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "#ecebeb",
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: "#ff6961",
    "&:hover": {
      color: "#333",
      backgroundColor: "#ff6961",
      transform: "rotate(360deg)",
      transition: "0.5s",
      cursor: "pointer",
    },
  }),
  clearIndicator: (provided) => ({
    ...provided,
    "&:hover": {
      color: "#ff6961",
      cursor: "pointer",
      transform: "rotate(180deg)",
      transition: "0.5s",
    },
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    padding: "0 0.3rem",
    "&:hover": {
      color: "var(--green-color)",
      cursor: "pointer",
      transform: "rotate(360deg)",
      transition: "0.5s",
    },
  }),
  singleValue: (provided, { isDisabled }) => ({
    ...provided,
    textAlign: "left",
    top: isDisabled ? "49%" : "50%",
  }),
  placeholder: (provided) => ({
    ...provided,
    textAlign: "left",
    fontSize: window.matchMedia("(max-width: 600px)").matches
      ? "0.9rem"
      : "inherit",
  }),
}
