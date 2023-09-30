import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NEW_RESOURCE_RESET } from "../../constants/resourceConstant";
import { clearErrors, createResource } from "../../actions/resourceAction";
import { BsPencilSquare } from "react-icons/bs";
import { MdCategory, MdDescription } from "react-icons/md";
import MetaData from "../Layout/MetaData";
import { Button } from "@mui/material";
import { AiOutlineLink } from "react-icons/ai";

const CreateResource = () => {
  const alert = useAlert();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.newResource);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [link, setLink] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "AI-chatbot",
    "AI-chatbot Advanced",
    "AI Code Assistant",
    "Resume with AI",
    "Development with AI",
    "Design with AI",
    "SEO with AI",
    "Bugs Finder",
    "Auto Code Completion",
    "Documentation Generator",
  ];

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Resource Created Successfully");
      navigate("/resources");
      dispatch({ type: NEW_RESOURCE_RESET });
    }
  }, [dispatch, alert, error, navigate, success]);

  const createResourceSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData(); 

    myForm.set("name", name);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("link", link);

    images.forEach((image) => {
      myForm.append("images", image);
    });

    dispatch(createResource(myForm));
  };

  const createResourceImageChange = (e) => {
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
      <MetaData title="Create Resource" />
      <div className="backdrop">
        <div className="newPostContainer">
          <form
            className="createPostForm"
            encType="multipart/form-data"
            onSubmit={createResourceSubmitHandler}
          >
            <h1>Create Resource</h1>

            <div>
              <BsPencilSquare />
              <input
                type="text"
                placeholder="Resource Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <MdDescription />

              <textarea
                placeholder="Resource Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <AiOutlineLink />
              <input
                type="text"
                placeholder="Link"
                required
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </div>

            <div>
              <MdCategory />
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value="">Choose Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div id="createPostFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createResourceImageChange}
                multiple={true}
              />
            </div>

            <div id="createPostFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Resource Preview" />
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

export default CreateResource;
