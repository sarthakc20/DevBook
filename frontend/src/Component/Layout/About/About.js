import React from "react";
import "./aboutSection.css";
import { Typography, Button, Avatar } from "@mui/material";
import { BsInstagram } from "react-icons/bs";
import { BsGithub } from "react-icons/bs";
import { BsLinkedin } from "react-icons/bs";
import MetaData from "../MetaData";

const About = () => {
  const visitInstagram = () => {
    window.location = "https://instagram.com/sarthak_chatterjee_";
  };
  return (
    <>
      <MetaData title={`About us`} />
      <div className="aboutSection">
        <div></div>
        <div className="aboutSectionGradient"></div>
        <div className="aboutSectionContainer">
          <Typography component="h1">About Us</Typography>

          <div>
            <div>
              <Avatar
                style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
                src="https://res.cloudinary.com/dfl9wcmy4/image/upload/v1692220011/samples/34901319024_ul15ek.jpg"
                alt="Founder"
              />
              <Typography>Sarthak Chatterjee</Typography>
              <Button onClick={visitInstagram} color="primary">
                Visit Instagram
              </Button>
              <span>
                Read our resources, be a part of our resources and give your
                contribution. Join this massive developer community. Let's build
                the world's largest developer community together.
              </span>
            </div>
            <div className="aboutSectionContainer2">
              <Typography component="h2">Social Links</Typography>
              <a href="https://github.com/sarthakc20" target="blank">
                <BsGithub className="iconAbout" />
              </a>

              <a
                href="https://www.linkedin.com/in/sarthak-chatterjee-"
                target="blank"
              >
                <BsLinkedin className="iconAbout" />
              </a>

              <a
                href="https://www.instagram.com/sarthak_chatterjee_"
                target="blank"
              >
                <BsInstagram className="iconAbout" id="lastIcon" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
