import React, { useMemo } from "react";

//mui
import Stack from "@mui/material/Stack";
import Box, { BoxProps } from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { RequestStatus } from "../utils/constants";

interface props {
  status?: RequestStatus;
  isLoading?: boolean;
  data?: any | any[];
  emptyMessage?: React.ReactNode;
}

export const LoadingBox: React.FC<props & BoxProps> = (props) => {
  const { status, isLoading, data, emptyMessage, children, ...rest } = props;
  const default_props = useMemo(
    () => ({
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: 100,
      ...rest,
    }),
    [props]
  );

  if (status) {
    if (status === "error") {
      return (
        <Box {...default_props}>
          <Stack alignItems={"center"} spacing={2}>
            {/* <ErrorOutline color="error" fontSize="large" /> */}
            <Typography color="error">{"Somthing went wrong"}</Typography>
          </Stack>
        </Box>
      );
    }

    if (status === "data") {
      return <Box {...rest}>{children}</Box>;
    }
  } else {
    if (!isLoading) {
      if (!data || !(data as any[])?.length) {
        return (
          <Box {...default_props}>
            <Typography>{emptyMessage ?? `${"No data"}`}</Typography>
          </Box>
        );
      } else return <Box {...rest}>{children}</Box>;
    }
  }

  return (
    <Box {...default_props}>
      <CircularProgress />
    </Box>
  );
};
