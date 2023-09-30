import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@mui/material";

const ResourceCard = ({ resource }) => {

  const [open, setOpen] = useState(false);

  const readToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) : string;
  }

  return (
    <>
    <div className="resourceCard" to={`/community/${resource._id}`}>
      {resource.images && resource.images[0] && resource.images[0].url ? (
        <img src={resource.images[0].url} alt={resource.name} />
      ) : (
        <h4>No image available</h4>
      )}
      <p>{resource.name}</p>
      <span>Category :{resource.category}</span>
      <div>
        <span className="resourcecardSpan">
          {truncate(resource?.description, 210)} <button onClick={readToggle}>...Click to Read</button>
        </span>
      </div>
      <h5>Resourceed by {resource.user}</h5>
      <a href={resource.link} target="_blank">
        Click To Visit
      </a>
    </div>

    <Dialog
        aria-labelledby="Simple-dialog-title"
        open={open}
        maxWidth="xl"
        onClose={readToggle}
        className="dialog"
      >
        <DialogTitle>{resource.name}</DialogTitle>
        <DialogContent className="submitDialogActions">
          {resource.description}
        </DialogContent>
        <DialogActions>
          <Button onClick={readToggle} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ResourceCard;
