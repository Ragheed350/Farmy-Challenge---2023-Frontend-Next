import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import {
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useMemo } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

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

  return (
    <Card sx={{ width: "100%", my: 1, bgcolor: "#f1f1f1" }}>
      <CardContent>
        <Grid container justifyContent={"space-between"} alignItems={"center"}>
          <Grid item>
            <Typography variant="h6">{ingredient?.name}</Typography>
          </Grid>
          <Grid item>
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
                    <IconButton size="small" color="error">
                      <RemoveIcon />
                    </IconButton>
                  ),
                  endAdornment: (
                    <IconButton size="small" color="primary">
                      <AddIcon />
                    </IconButton>
                  ),
                }}
              />
            </Stack>
          </Grid>
          <Grid item>
            <Typography>{ingredient?.weightPerServing}g</Typography>
          </Grid>
          <Grid item>
            <Typography>{ingredient?.costPerServing}$</Typography>
          </Grid>
          <Grid item>
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
