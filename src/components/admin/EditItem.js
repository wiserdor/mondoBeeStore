import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Axios from "axios";

const EditItem = ({ item, token, title }) => {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState(item.name);
  const [price, setPrice] = useState(item.price);
  const [unitName, setUnitName] = useState(item.unit_name);
  const [countStep, setCountStep] = useState(item.count_step);
  const [estimation, setEstimation] = useState(item.estimate_quantity_per_unit);
  const [description, setDescription] = useState(item.description);
  const [unitCount, setUnitCount] = useState(item.unit_count);
  const [imgPath, setImagePath] = useState(item.img_path);
  const [discountTotal, setDiscountTotal] = useState(item.discount_total);
  const [discountPerUnit, setDiscountPerUnit] = useState(
    item.discount_per_unit
  );

  const applyEdit = async () => {
    const payload = {
      name,
      price: parseFloat(price),
      unit_name: unitName,
      count_step: parseFloat(countStep),
      estimate_quantity_per_unit: parseFloat(estimation),
      description,
      unit_count: parseFloat(unitCount),
      img_path: imgPath,
      discount_total: parseFloat(discountTotal),
      discount_per_unit: parseFloat(discountPerUnit),
    };
    if (item.id) payload.id = item.id;
    const url = item.id ? "/api/catalog/edit" : "/api/catalog/add";
    Axios.post(url, payload, {
      headers: {
        Authorization: `Basic ${token}`,
      },
    });
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="outlined"
        size="large"
        color="primary"
        onClick={() => setOpen(true)}
      >
        {title}
      </Button>
      <Dialog
        open={open}
        scroll="body"
        onClose={() => setOpen(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent style={{ textAlign: "center" }}>
          <DialogContentText></DialogContentText>
          <TextField
            id="filled-basic"
            label="שם המוצר"
            value={name}
            margin="dense"
            onInput={(e) => setName(e.target.value)}
            fullWidth
          />

          <TextField
            id="filled-basic"
            label="מחיר"
            value={price}
            margin="dense"
            onInput={(e) => setPrice(e.target.value)}
            fullWidth
          />
          <TextField
            id="filled-basic"
            label="יחידה(קילו,סלסלה...)"
            value={unitName}
            margin="dense"
            onInput={(e) => setUnitName(e.target.value)}
            fullWidth
          />
          <TextField
            id="filled-basic"
            label="כמות לפי יחידה עבור המחיר"
            value={unitCount}
            margin="dense"
            onInput={(e) => setUnitCount(e.target.value)}
            fullWidth
          />
          <TextField
            id="filled-basic"
            label="תאור"
            value={description}
            margin="dense"
            onInput={(e) => setDescription(e.target.value)}
            fullWidth
          />
          <TextField
            id="filled-basic"
            label="מיקום תמונה"
            value={imgPath}
            margin="dense"
            onInput={(e) => setImagePath(e.target.value)}
            fullWidth
          />
          <TextField
            id="filled-basic"
            label="מדרגות קפיצה(למשל עבור שום ניתן לקנות בקפיצות של חצי קילו)"
            value={countStep}
            margin="dense"
            onInput={(e) => setCountStep(e.target.value)}
            fullWidth
          />
          <TextField
            id="filled-basic"
            label="הערכה לכמה קילו אמור להיות יחידה (למשל אבטיח הוא 7 קג בערך)"
            value={estimation}
            margin="dense"
            onInput={(e) => setEstimation(e.target.value)}
            fullWidth
          />
          <TextField
            id="filled-basic"
            label="כמה כמות כדי להחל הנחה"
            value={discountTotal}
            margin="dense"
            onInput={(e) => setDiscountTotal(e.target.value)}
            fullWidth
          />
          <TextField
            id="filled-basic"
            label="כמה הנחה במחיר עבור כמות"
            value={discountPerUnit}
            margin="dense"
            onInput={(e) => setDiscountPerUnit(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            בטל
          </Button>
          <Button
            onClick={() => {
              applyEdit();
            }}
            color="primary"
          >
            {item.id?"ערוך":"הוסף"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditItem;
