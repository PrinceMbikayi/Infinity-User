import React from "react";

const Color = (props) => {
const {colorData,setColor,color}=props
  return (
    <>
      <ul className="amazon-color-options ps-0">
        {
          colorData && colorData?.map((item, index) => {
            return (
              <li 
                className="amazon-color-swatch" 
                onClick={()=>setColor(item?._id)} 
                style={{
                  backgroundColor: item?.hexCode || item?.title,
                  border: color===item?._id ? '3px solid #007185' : '1px solid #ddd',
                  boxShadow: color===item?._id ? '0 0 0 1px #007185' : 'none'
                }}
                title={item?.title}
                key={index}
              ></li>
            )
          })
       }
      </ul>
    </>
  );
};

export default Color;
