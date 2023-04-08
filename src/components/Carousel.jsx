// import React from "react";
// import Card from "./Card";
// import courseDataList from "../Data/courseDataList";

// function Carousel() {
//   return (
//     <>
//       <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
//         {courseDataList.map((courseData, index) => (
//           <Card key={index} courseData={courseData} />
//         ))}
//       </div>
//     </>
//   );
// }

// export default Carousel;

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "./Card";
import courseDataList from "../Data/courseDataList";

function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: false,
    centerMode: true,
    centerPadding: "50px",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <Slider {...settings}>
        {courseDataList.map((courseData, index) => (
          <div key={index}>
            <Card courseData={courseData} />
          </div>
        ))}
      </Slider>
    </>
  );
}

export default Carousel;
