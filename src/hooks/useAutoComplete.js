import {useState, useCallback} from "react";

const getAllOptions = ({data, fieldName}) => {
  return data ? data?.items.map((item) => ({value: item[fieldName]})) : [];
};

export function useAutoComplete(initialOptions) {
  const allOptions = getAllOptions(initialOptions);

  const [options, setOptions] = useState(allOptions);
  const [isNewItem, setIsNewItem] = useState(false);

  const handleOnSearch = (value) => {
    const filtered = allOptions.filter((option) =>
      option.value.toLowerCase().includes(value.toLowerCase())
    );

    setOptions(filtered);

    setIsNewItem(!filtered.filter((option) => option.value === value).length);
  };

  const handleOnSelect = (value) => {
    setIsNewItem(!options.filter((option) => option.value === value).length);
  };

  return {
    options,
    isNewItem,
    handleOnSearch,
    handleOnSelect,
  };
}
