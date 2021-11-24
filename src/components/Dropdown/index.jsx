import React, { useState } from 'react';
import { Select } from '@chakra-ui/react';
import { Cities } from '../../constant/city';

const Dropdown = () => {
  const [selected, setSelected] = useState('all');

  return (
    <>
      <Select fontSize="2xl" placeholder="選擇縣市" value={selected} iconSize={32} border="0" onChange={e => setSelected(e.target.value)}>
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
