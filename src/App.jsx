import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import makeAnimated from "react-select/animated";
import AsyncSelect from "react-select/async";
import { useState } from "react";

const options = [
  { value: "chocolate", label: "Chocolate", color: "brown" },
  { value: "strawberry", label: "Strawberry", color: "red" },
  { value: "vanilla", label: "Vanilla", color: "yellow" },
];

const animatedComponents = makeAnimated();

const styles = {
  control: (styles) => {
    return {
      ...styles,
      backgroundColor: "#eee0cb",
    };
  },
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: "#EEE0CB",
      color: data.color,
    };
  },
  multiValue: (styles, { data }) => {
    return {
      ...styles,
      backgroundColor: data.color,
      color: "white",
    };
  },
  multiValueLabel: (styles) => {
    return {
      ...styles,
      color: "white",
    };
  },
  multiValueRemove: (styles) => {
    return {
      ...styles,
      backgroundColor: "orange",
      color: "red",
    };
  },
};

function App() {
  const [opts, setOpts] = useState(options);

  const loadOptions = (searchValue, callback) => {
    setTimeout(() => {
      const filteredOptions = options.filter((option) =>
        option.label.toLowerCase().includes(searchValue.toLowerCase())
      );
      callback(filteredOptions);
    }, 2000);
  };

  return (
    <div style={{ width: "70%" }}>
      <Select
        isMulti
        closeMenuOnSelect={false}
        defaultValue={options[2]}
        options={options}
        components={animatedComponents}
        onChange={(selectedOption) => {
          console.log(selectedOption);
        }}
      />

      <AsyncSelect
        closeMenuOnSelect={false}
        loadOptions={loadOptions}
        components={animatedComponents}
        defaultOptions
        onChange={(selectedOption) => {
          console.log(selectedOption);
        }}
        isMulti
        styles={styles}
      />

      <CreatableSelect
        closeMenuOnSelect={false}
        options={opts}
        onCreateOption={(inputValue) => {
          const newOption = {
            value: inputValue,
            label: inputValue.toUpperCase(),
            color: "grey",
          };
          setOpts([...opts, newOption]);
        }}
      />
    </div>
  );
}

export default App;
