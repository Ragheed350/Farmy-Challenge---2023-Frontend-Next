import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useMemo } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import {
  deleteSaladIngredientsState,
  editSaladIngredientsState,
  editSaladState,
} from "@/src/redux/salad";

type Props = {
  ingredient_id: number;
  numOfServings: number;
};

export const IngredientCard = ({ ingredient_id, numOfServings }: Props) => {
  const dispatch = useAppDispatch();
  const { status, ingredients } = useAppSelector((state) => state.Ingredient);

  const ingredient = useMemo(() => {
    const ind = ingredients.findIndex((el) => el.id === ingredient_id);
    if (ind !== -1) return ingredients[ind];
  }, [ingredients, ingredient_id]);

  const handleDeleteIngredient = () => {
    dispatch(deleteSaladIngredientsState({ ingredient_id }));
  };

  const handleIncreaseIngredient = () => {
    if (ingredient) {
      dispatch(
        editSaladIngredientsState({
          ingredient_id,
          numOfServings: numOfServings + 1,
        })
      );
    }
  };

  const handleDecreaseIngredient = () => {
    if (ingredient) {
      if (numOfServings > 1) {
        dispatch(
          editSaladIngredientsState({
            ingredient_id,
            numOfServings: numOfServings - 1,
          })
        );
      } else handleDeleteIngredient();
    }
  };

  return (
    <Card sx={{ width: "100%", my: 1, bgcolor: "#f1f1f1" }}>
      <CardContent>
        <Grid
          container
          spacing={2}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Grid item xs>
            <Typography variant="h6">{ingredient?.name}</Typography>
          </Grid>
          <Grid item xs>
            <Stack direction="row" alignItems={"center"}>
              <Typography>servings: </Typography>
              <TextField
                id="outlined-start-adornment"
                sx={{ m: 1, width: "20ch" }}
                value={numOfServings}
                inputProps={{ sx: { textAlign: "center" } }}
                InputProps={{
                  sx: { px: "5px" },

                  startAdornment: (
                    <IconButton
                      size="small"
                      color="error"
                      onClick={handleDecreaseIngredient}
                    >
                      <RemoveIcon />
                    </IconButton>
                  ),
                  endAdornment: (
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={handleIncreaseIngredient}
                    >
                      <AddIcon />
                    </IconButton>
                  ),
                }}
              />
            </Stack>
          </Grid>
          <Grid item>
            <Typography>
              {(ingredient?.weightPerServing * numOfServings).toFixed(2)}g
            </Typography>
          </Grid>
          <Grid item>
            <Typography>
              {(ingredient?.costPerServing * numOfServings).toFixed(2)}$
            </Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={handleDeleteIngredient}>
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
