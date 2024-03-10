import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MdHome } from "react-icons/md";
import "./Breadcrumbs.css";

const Breadcrumbs = () => {
  const { pathname } = useLocation();
  const pathnames = pathname.split("/").filter((a) => a); // filter to get rid of falsy paths

  // Check if path contains "resources" or "account" or if it has only one segment, and don't render breadcrumbs if true
  if ((pathnames.includes("resources") || pathnames.includes("account")) || pathnames.length === 1) {
    return null;
  }

  let breadcrumbPath = "";

  return (
    <div className="breadcrumbs">
      {pathnames.length > 0 && <Link to="/"><MdHome /></Link>}
      {pathnames.map((name, index) => {
        breadcrumbPath += `${name}`;
        const isLastLink = index === pathnames.length - 1;

        return isLastLink ? (
          <span key={breadcrumbPath}> / {name}</span>
        ) : (
          <span key={breadcrumbPath}> 
            / <Link to={breadcrumbPath}>{name} </Link>
          </span>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
