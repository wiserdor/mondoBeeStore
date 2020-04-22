import React from "react";
import Link from "@material-ui/core/Link";
import { Paper, Typography } from "@material-ui/core";

const NotFound = (params) => {
  return (
    <>
      <Paper
        variant="outlined"
        style={{ textAlign: "center", marginTop: "50vh" }}
      >
        <Typography variant="h2">נכנסתם לדף הלא נכון...</Typography>
        <Typography variant="h2">
          <Link href="/">לחצו כאן לחזרה לדף הראשי</Link>
        </Typography>
      </Paper>
    </>
  );
};

export default NotFound;
