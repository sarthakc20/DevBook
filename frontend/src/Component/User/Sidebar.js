import React, { useState } from "react";
import "./Sidebar.css";
import logo from "../../images/DevbookLogo.png";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { TreeView, TreeItem } from "@mui/lab";
import { MdExpandMore } from "react-icons/md";
import { MdAddCircle } from "react-icons/md";
import { MdImportExport } from "react-icons/md";
import { FaList, FaUserEdit, FaUsers } from "react-icons/fa";
import { RiDashboardFill } from "react-icons/ri";
import { BiSolidLockOpen, BiWorld } from "react-icons/bi";
import { useSelector } from "react-redux";

const Sidebar = () => {

  const { user } = useSelector((state) => state.user);

  return (
    <div className="sidebar">
      <Link to="/">
        <img src={logo} alt="E-MARKET" />
      </Link>

      <Link to="/account">
        <p>
          <RiDashboardFill /> My Profile
        </p>
      </Link>

      <Link>
        <TreeView
          defaultCollapseIcon={<MdExpandMore />}
          defaultExpandIcon={<MdImportExport />}
        >
          <TreeItem nodeId="1" label="Community">
            <Link to="/account/my/posts">
              <TreeItem nodeId="2" label="My Posts" icon={<FaList />} />
            </Link>

            <Link to="/community/new">
              <TreeItem nodeId="3" label="Create Post" icon={<MdAddCircle />} />
            </Link>
          </TreeItem>
        </TreeView>
      </Link>

      <Link>
        <TreeView
          defaultCollapseIcon={<MdExpandMore />}
          defaultExpandIcon={<MdImportExport />}
        >
          <TreeItem nodeId="1" label="Resources">
            <Link to="/account/my/resources">
              <TreeItem nodeId="2" label="My Resources" icon={<FaList />} />
            </Link>

            <Link to="/resources/new">
              <TreeItem
                nodeId="3"
                label="Create Resource"
                icon={<MdAddCircle />}
              />
            </Link>
          </TreeItem>
        </TreeView>
      </Link>

      <Link to="/me/update">
        <p>
          <FaUserEdit /> Edit Profile
        </p>
      </Link>

      <Link to="/password/update">
        <p>
          <BiSolidLockOpen /> Change Password
        </p>
      </Link>

      <Link to="/users">
        <p>
          <FaUsers /> All Users
        </p>
      </Link>

      <Link to={`/user/profile/${user._id}`}>
        <p>
          <BiWorld /> My Public Profile
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;
