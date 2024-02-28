import { Stack, Typography } from "@mui/material";
import React from "react";
import { BlockBetween, BlockHead, BlockHeadContent } from "../Component";

const Header = () => {
  return (
    <Stack>
      <BlockHead size="sm">
        <BlockBetween>
          <BlockHeadContent>
            <Typography
              style={{
                fontSize: "24.5px",
                fontWeight: "bold",
              }}
            >
              Logs
            </Typography>
          </BlockHeadContent>
          <BlockHeadContent></BlockHeadContent>
        </BlockBetween>
      </BlockHead>
    </Stack>
  );
};

export default Header;
