import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MdHome } from "react-icons/md";
import "./Breadcrumbs.css";

const Breadcrumbs = () => {
  const { pathname } = useLocation();
  const pathnames = pathname.split("/").filter((a) => a); // filter to get rid of falsy paths
  let breadcrumbPath = "";

  // Check if pathnames contain "resources", and don't render breadcrumbs if true
  if (pathnames.length === 1 && pathnames[0] === "resources" && pathnames[0] === "account") {
    return null;
  }

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
