import React from "react";
import { NavLink } from "react-router-dom";
import tempPic from "../../images/bg-up.png";

const postCard = ({ post }) => {
  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }
  return (
    <NavLink classname="postCard" to={`/community`}>   //to={`/post/${post._id}`}
      <img src={tempPic} alt="name" />  //alt={post.name}
      <p>Post Name</p>
      <div>
        <span className="postcardSpan">
          {truncate(
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est quam asperiores rerum eligendi minima vero, voluptatem unde non, in magni provident ut dolore accusamus ad esse consequuntur aliquid maxime veniam perspiciatis. Dolore modi sit fuga aperiam. Nihil rem maxime dicta fugit consequatur natus facere excepturi aliquam animi sapiente, est consequuntur molestias iusto dolor, esse alias. Officia aliquid possimus optio placeat, eaque, obcaecati voluptatibus iure, quod ex eum animi. Error eum atque illo sapiente soluta omnis cum quaerat expedita provident aliquid nobis voluptatem explicabo recusandae maxime quasi saepe repellat enim quam a voluptate commodi, deleniti accusantium dolorum! Placeat, corrupti? Nemo expedita harum debitis nulla, eos quam numquam labore! Beatae quam quibusdam alias, eius voluptatum delectus exercitationem ducimus! Iure accusamus consectetur sunt dolor nulla dignissimos id ea quis temporibus! Sit necessitatibus eum voluptatum cum neque nobis deserunt corrupti hic! Exercitationem nobis totam quidem. Facilis in quaerat, a molestias nemo est distinctio laboriosam provident maiores ipsum possimus libero quas illo ut expedita itaque. Rerum voluptate distinctio aliquid ea at expedita quibusdam repellendus nesciunt quos officia nobis dolores laudantium natus repudiandae, ratione neque molestiae voluptatum commodi. Consequuntur officia voluptates nostrum, reprehenderit velit optio ad quisquam hic architecto qui eaque odio debitis non placeat numquam!",
            100
          )}
        </span>
      </div>
    </NavLink>
  );
};

export default postCard;
