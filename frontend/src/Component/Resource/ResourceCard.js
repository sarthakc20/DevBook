import React from 'react'

const ResourceCard = ({resource}) => {
  return (
    <div className="resourceCard" to={`/community/${resource._id}`}>
        <img src={resource.image} alt={resource.name} />
        <p>{resource.name}</p>
        <span>Category :{resource.category}</span>
        <div>
          <span className="resourcecardSpan">
            {resource.description}
          </span>
        </div>
        <h5>Resourceed by {resource.user}</h5>
        <a href={resource.link} target="_blank">Click To Visit</a>
      </div>
  )
}

export default ResourceCard
