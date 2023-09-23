import React from "react";
import "./Contact.css";
import { Button } from "@mui/material";
import { FaPhoneAlt } from "react-icons/fa";
import { FaMapMarkedAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import MetaData from "../MetaData";

const Contact = () => {
  return (
    <>
      <MetaData title={`Contact Us`} />
      <div className="contactBox">
        <div className="contact_info_item">
          <FaPhoneAlt className="icon" />
          <div className="contact_info_content">
            <div className="contact_info_title">Phone</div>
            <div className="contact_info_text">+91 7586 969 739</div>
          </div>
        </div>

        <div className="contact_info_item">
          <MdEmail className="icon" />
          <div className="contact_info_content">
            <div className="contact_info_title">Email</div>
            <div className="contact_info_text">sarthak@gamil.com</div>
          </div>
        </div>

        <div className="contact_info_item">
          <FaMapMarkedAlt className="icon" />
          <div className="contact_info_content">
            <div className="contact_info_title">Address</div>
            <div className="contact_info_text">Jalpaiguri, West Bengal</div>
          </div>
        </div>
      </div>

      <div className="contactContainer">
        <a className="mailBtn" href="mailto:sarthatc@gmail.com">
          <Button>
            Contact <span>: sarthatc@gmail.com</span>
          </Button>
        </a>
      </div>
    </>
  );
};

export default Contact;