import React from "react";

const Color = (props) => {
const {colorData,setColor,color}=props
  return (
    <>
      <ul className="colors ps-0">
        {
          colorData && colorData?.map((item, index) => {
            return (
              <li className="" onClick={()=>setColor(item?._id)} style={
                {backgroundColor:item?.title,
                  border: color===item?._id ? '2px solid red' : 'none'


                }
                
              } key={index}></li>
            )
          })
       }
      </ul>
    </>
  );
};

export default Color;
