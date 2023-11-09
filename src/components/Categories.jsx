import React from 'react';

const Categories = ({ allCategories, filterItems }) => {
  return (
    <div className="categories text-center ">
      {allCategories.map((league, index) => (
        <a key={index} className="btn btn-info m-1.5 mt-5 mb-5" onClick={() => filterItems(league)}>
          {league}
        </a>
      ))}
    </div>
  );
}

export default Categories;