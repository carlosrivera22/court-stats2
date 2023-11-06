import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import SwapVertIcon from "@mui/icons-material/SwapVert";

type SortKey = "ppg" | "apg" | "rpg";

interface SortDropdownProps {
  sortBy: (key: SortKey) => void; // Your sorting function
}

const SortDropdown: React.FC<SortDropdownProps> = ({ sortBy }) => {
  const [sortKey, setSortKey] = useState<SortKey>("ppg");

  const handleChange = (event: SelectChangeEvent) => {
    const key = event.target.value as SortKey;
    setSortKey(key);
    sortBy(key);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="sort-select-label">Sort By</InputLabel>
      <Select
        labelId="sort-select-label"
        id="sort-select"
        value={sortKey}
        label="Sort By"
        onChange={handleChange}
        IconComponent={SwapVertIcon} // Using the switcher icon
      >
        <MenuItem value="ppg">Points Per Game (PPG)</MenuItem>
        <MenuItem value="apg">Assists Per Game (APG)</MenuItem>
        <MenuItem value="rpg">Rebounds Per Game (RPG)</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortDropdown;
