import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Stack,
  Divider,
  TextField,
  Button,
  Tooltip,
  DialogActions,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  UpdateSaladAsync,
  editSaladState,
  removeSaladState,
} from "@/redux/salad";
import { LoadingBox } from "@/src/components/LoadingBox";
import { IngredientCard } from "./IngredientCard";
import { AddNewIngredient } from "./AddNewIngredient";

export const SaladDialog = () => {
  const dispatch = useAppDispatch();
  const { salad, salad_status, logic } = useAppSelector((state) => state.Salad);

  const handleCloseSaladDialog = () => {
    dispatch(removeSaladState({}));
  };

  const handleChangeSize = (size: "small" | "medium" | "large") => {
    switch (size) {
      case "small":
        dispatch(editSaladState({ key: "size", value: "medium" }));
        return;
      case "medium":
        dispatch(editSaladState({ key: "size", value: "large" }));
        return;
      case "large":
        dispatch(editSaladState({ key: "size", value: "small" }));
        return;
    }
  };

  const handleSaveSalad = () => {
    handleCloseSaladDialog();
    dispatch(UpdateSaladAsync(salad));
  };

  return (
    <Dialog
      open={!!salad}
      onClose={handleCloseSaladDialog}
      PaperProps={{ sx: { maxWidth: "100%" } }}
    >
      <LoadingBox status={salad_status}>
        <DialogTitle>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            spacing={1}
            py={1}
          >
            <TextField
              inputProps={{ sx: { fontSize: 20 } }}
              value={salad?.name}
              onChange={(e) =>
                dispatch(editSaladState({ key: "name", value: e.target.value }))
              }
            />
            <Tooltip title="Press to change size" placement="top">
              <Button
                size="medium"
                variant="contained"
                color="secondary"
                sx={{ borderRadius: 5, height: "fit-content" }}
                onClick={() => handleChangeSize(salad.size)}
              >
                {salad?.size}
              </Button>
            </Tooltip>
          </Stack>
          <Divider />
          <Stack direction={"row"} alignItems={"center"} spacing={1}>
            <Typography variant="subtitle2" color="gray">
              target cost/weight:
            </Typography>
            <Typography variant="subtitle1">
              {" "}
              {logic.saladTypes[salad.size].targetCost + "$"}
              {" / "}
              {logic.saladTypes[salad.size].targetWeight + "g"}
            </Typography>
          </Stack>
        </DialogTitle>

        <DialogContent>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Typography variant="subtitle2" color="gray">
              total cost: {salad.cost}
            </Typography>
            <Typography variant="subtitle2" color="gray">
              total weight: {salad.targetStock}
            </Typography>
          </Stack>

          {salad?.ingredients.map((ingredient) => (
            <IngredientCard
              key={ingredient.id}
              ingredient_id={ingredient.id}
              numOfServings={ingredient.numOfServings}
            />
          ))}

          {/* add new ingredient */}
          <AddNewIngredient />

          <DialogActions>
            <Button
              variant="outlined"
              color="error"
              onClick={handleCloseSaladDialog}
            >
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSaveSalad}>
              Save
            </Button>
          </DialogActions>
        </DialogContent>
      </LoadingBox>
    </Dialog>
  );
};
