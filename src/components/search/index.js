import React, { useState } from 'react';
import { useUIContext } from "../context/ui";
import { IconButton, Slide } from "@mui/material";
import { SearchBoxContainer, SearchField } from "../../styles/searchStyles";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

const SearchBox = () => {
  const { showSearchBox, setShowSearchBox } = useUIContext();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    // You can add logic here to handle the search term, e.g., updating a search context or state
  };

  return (
    <Slide direction="down" in={showSearchBox} timeout={500}>
      <SearchBoxContainer>
        <SearchField
          color="secondary"
          variant="standard"
          fullWidth
          placeholder="search..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <IconButton>
          <SearchIcon sx={{ fontSize: { xs: '2rem', md: "3rem" } }} color="secondary" />
        </IconButton>
        <IconButton
          onClick={() => setShowSearchBox(false)}
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
          }}
        >
          <CloseIcon sx={{ fontSize: "4rem" }} color="secondary" />
        </IconButton>
      </SearchBoxContainer>
    </Slide>
  );
};

export default SearchBox;
