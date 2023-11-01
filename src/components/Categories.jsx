import React from 'react';

const Categories = ({ allCategories, filterItems }) => {
  return (
    <div className="categories text-center my-4">
      {allCategories.map((league, index) => (
        <a key={index} className="btn btn-accent m-0.5 " onClick={() => filterItems(league)}>
          {league}
        </a>
      ))}
    </div>
  );
}

export default Categories;