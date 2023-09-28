import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearErrors, createPost } from "../../actions/postAction";
import { NEW_POST_RESET } from "../../constants/postConstants";
import { BsPencilSquare } from "react-icons/bs";
import { MdCategory, MdDescription } from "react-icons/md";
import { Button } from "@mui/material";
import MetaData from "../Layout/MetaData";
import "./CreateCommunity.css";

const CreateCommunity = () => {
  const alert = useAlert();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.newPost);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [topic, setTopic] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const topics = [
    "Development",
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Redux",
    "Node",
    "Express",
    "Python",
    "All",
  ];

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Post Created Successfully");
      navigate("/community");
      dispatch({ type: NEW_POST_RESET });
    }
  }, [dispatch, alert, error, navigate, success]);

  const createPostSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData(); 

    myForm.set("name", name);
    myForm.set("description", description);
    myForm.set("topic", topic);

    images.forEach((image) => {
      myForm.append("images", image);
    });

    dispatch(createPost(myForm));
  };

  const createPostImageChange = (e) => {
    const files = Array.from(e.target.files);
    // Array.from creates a copy of an array

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      <MetaData title="Create Post" />
      <div className="backdrop">
        <div className="newPostContainer">
          <form
            className="createPostForm"
            encType="multipart/form-data"
            onSubmit={createPostSubmitHandler}
          >
            <h1>Create Post</h1>

            <div>
              <BsPencilSquare />
              <input
                type="text"
                placeholder="Post Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <MdDescription />

              <textarea
                placeholder="Post Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <MdCategory />
              <select onChange={(e) => setTopic(e.target.value)}>
                <option value="">Choose Category</option>
                {topics.map((top) => (
                  <option key={top} value={top}>
                    {top}
                  </option>
                ))}
              </select>
            </div>

            <div id="createPostFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createPostImageChange}
                multiple={true}
              />
            </div>

            <div id="createPostFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Post Preview" />
              ))}
            </div>

            <Button
              id="createPostBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateCommunity;
