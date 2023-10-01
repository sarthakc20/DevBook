import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import { deleteResource } from "../../actions/resourceAction";
import { useDispatch } from "react-redux";

const MyResourceCard = ({ resource }) => {

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);


  const readToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) : string;
  }

  const deletePosthandler = (id) => {
    dispatch(deleteResource(id));
  };

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
            {truncate(resource?.description, 210)}
            <button onClick={readToggle}>...Click to Read</button>
          </span>
        </div>
        <h5>Resourceed by {resource.user}</h5>
        <span>Posted On : {String(resource.createdAt).substring(0, 10)}</span>
        <a href={resource.link} target="_blank">
          Click To Visit
        </a>

        <div className="btnContainer">
          <button onClick={() => deletePosthandler(`${resource._id}`)}>Delete Post</button>
        </div>
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

export default MyResourceCard;
