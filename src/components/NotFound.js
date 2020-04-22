import React from "react";
import Link from "@material-ui/core/Link";
import { Paper, Typography } from "@material-ui/core";

const NotFound = (params) => {
  return (
    <>
      <Paper
        variant="outlined"
        style={{ textAlign: "center", marginTop: "20vh" }}
      >
        <Typography variant="h4">הדף לא קיים...</Typography>
        <Typography variant="h4">
          <Link href="/">לחצו כאן לחזרה לדף הראשי</Link>
        </Typography>
      </Paper>
    </>
  );
};

export default NotFound;
