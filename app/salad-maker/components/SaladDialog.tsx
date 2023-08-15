import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Stack,
  Chip,
  Divider,
  TextField,
  Button,
  Tooltip,
} from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { GetSalad, UpdateSaladAsync, editSaladState } from "@/redux/salad";
import { LoadingBox } from "@/src/components/LoadingBox";
import { IngredientCard } from "./IngredientCard";
import { FetchIngredients } from "@/src/redux/ingredient";
import { UpdateSalad_Req } from "@/src/types";

export const SaladDialog = () => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();

  const id = searchParams.get("id");

  const { salad, salad_status } = useAppSelector((state) => state.Salad);

  const handleCloseSaladDialog = () => {
    router.replace("/salad-maker");
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

  const handleSaveSalad = (req: UpdateSalad_Req) => {
    dispatch(UpdateSaladAsync(req));
  };

  useEffect(() => {
    dispatch(GetSalad({ id: Number(id) }));
    dispatch(FetchIngredients());
  }, []);

  return (
    <Dialog
      open={!!id}
      onClose={handleCloseSaladDialog}
      PaperProps={{ sx: { maxWidth: "100%" } }}
    >
      <LoadingBox status={salad_status} sx={{ minWidth: 800 }}>
        <DialogTitle>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
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
                sx={{ borderRadius: 5, height: "fit-content" }}
                onClick={() => handleChangeSize(salad.size)}
              >
                {salad?.size}
              </Button>
            </Tooltip>
          </Stack>
          <Divider />
          <Typography variant="subtitle2" color="gray">
            target cost/weight: 3,50$
          </Typography>
        </DialogTitle>

        <DialogContent>
          {salad?.ingredients.map((ingredient) => (
            <IngredientCard
              ingredient_id={ingredient.id}
              numOfServings={ingredient.numOfServings}
            />
          ))}
        </DialogContent>
      </LoadingBox>
    </Dialog>
  );
};
