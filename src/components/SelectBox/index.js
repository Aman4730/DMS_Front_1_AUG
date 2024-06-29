import * as React from "react";
import Select from "@mui/material/Select";
import { Box, InputLabel } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import OutlinedInput from "@mui/material/OutlinedInput";

const ITEM_HEIGHT = 55;
const ITEM_PADDING_TOP = 2;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function SelectBox({
  id,
  label,
  items = [],
  handleChange,
  selectedItems = [],
}) {
  return (
    <FormControl sx={{ width: "100%" }}>
      <Box sx={{ marginBottom: 1 }}>
        <InputLabel id="demo-multiple-checkbox-label">{label}</InputLabel>
      </Box>
      <Select
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-checkbox"
        multiple
        size="small"
        value={selectedItems}
        onChange={handleChange(id)}
        input={<OutlinedInput label={label} />}
        renderValue={(selected) => selected.join(", ")}
        MenuProps={MenuProps}
      >
        {items.length > 0 ? (
          items.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox
                checked={selectedItems.indexOf(name) > -1}
                sx={{mb:-2,mt:-2,ml:-2}}
              />
              <ListItemText primary={name} />
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>
            <ListItemText primary="No options available" />
          </MenuItem>
        )}
      </Select>
    </FormControl>
  );
}
