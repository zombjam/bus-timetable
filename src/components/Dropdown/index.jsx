import React, { useState } from 'react';
import { Select } from '@chakra-ui/react';
import { Cities } from '../../constant/city';

const Dropdown = ({ onDropdown }) => {
  const [selected, setSelected] = useState('');

  const handleChange = (e) => {
    setSelected(e.target.value);
    if (onDropdown) {
      onDropdown(e.target.value);
    }
  };

  return (
    <>
      <Select
        fontSize="2xl"
        placeholder="選擇縣市"
        value={selected}
        iconSize={32}
        _focus={{ borderColor: 'primary.600', boxShadow: '0 0 0 1px #7550CC' }}
        border="0"
        onChange={handleChange}
        cursor="pointer"
      >
        {Cities.map((city, index) => (
          <option key={city.key} value={city.key}>
            {city.value}
          </option>
        ))}
      </Select>
    </>
  );
};

export default Dropdown;
