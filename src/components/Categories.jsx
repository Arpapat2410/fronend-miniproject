import React from 'react';

// allCategories คือ prop ที่ถูกส่งเข้ามากับคอมโพเนนท์นี้ ซึ่งเป็นอาร์เรย์ของหมวดหมู่ทั้งหมดที่จะถูกแสดง
//filterItems: คือฟังก์ชันที่ถูกส่งเข้ามาและถูกเรียกเมื่อผู้ใช้คลิกที่หนึ่งในปุ่มหมวดหมู่ ซึ่งส่งหมวดหมู่ที่ถูกคลิกไปให้.
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