import { Button, Menu, MenuItem } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import React from "react";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { addSaladIngredientsState } from "@/src/redux/salad";

type Props = {};

export const AddNewIngredient = (props: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const dispatch = useAppDispatch();
  const { ingredients } = useAppSelector((state) => state.Ingredient);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleSelectItem = (e: any) => {
    dispatch(addSaladIngredientsState({ ingredient_id: Number(e.target.id) }));
    handleCloseMenu();
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpenMenu} fullWidth>
        <AddIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        slotProps={{
          paper: {
            style: { maxHeight: 200, width: "40vw" },
          },
        }}
      >
        {ingredients.map((el) => (
          <MenuItem key={el.id} id={String(el.id)} onClick={handleSelectItem}>
            {el.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
