import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { UPDATE_POST_RESET } from "../../constants/postConstants";
import { clearErrors, getPostDetails, updatePost } from "../../actions/postAction";
import { Button } from "@mui/material";
import { MdCategory, MdDescription } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import MetaData from "../Layout/MetaData";

const UpdateMyPost = () => {
  const alert = useAlert();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { error, post } = useSelector((state) => state.postDetails);

  const { id } = useParams();

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.editPost);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [topic, setTopic] = useState("");
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
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
    if (post && post._id !== id) {
      dispatch(getPostDetails(id));
    } else {
      setName(post.name);
      setDescription(post.description);
      setTopic(post.topic);
      setOldImages(post.images);
    }


    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Post Updated Successfully");
      navigate("/account/my/posts");
      dispatch({ type: UPDATE_POST_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    navigate,
    updateError,
    isUpdated,
    id,
    post,
  ]);

  const updatePostSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("description", description);
    myForm.set("topic", topic);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(updatePost(id, myForm));
  };

  const updatePostImagesChange = (e) => {
    const files = Array.from(e.target.files);
    // Array.from creates a copy of an array

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

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
      <MetaData title="Edit Post" />
      <div className="backdrop">
        <div className="newPostContainer">
          <form
            className="createPostForm"
            encType="multipart/form-data"
            onSubmit={updatePostSubmitHandler}
          >
            <h1>Edit Post</h1>

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
                onChange={updatePostImagesChange}
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
              Update
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateMyPost;
