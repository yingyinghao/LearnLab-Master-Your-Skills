import React, {useState, useEffect} from "react";
import Card from "../components/Card";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import courseDataList from "../Data/courseDataList";
import Loader from "../components/Loading";

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [jsCourses, setJsCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uiCourses, setUiCourses] = useState([]);

  const getCourses = async () => {
    const coursesData = courseDataList.map((data) => {
      return {id: data.id, ...data};
    });
    const firstFiveCourses = coursesData.slice(-5);
    setCourses(firstFiveCourses);
    setAllCourses(coursesData);
  };

  useEffect(() => {
    getCourses();
  }, []);

  useEffect(() => {
    if (allCourses) {
      let totalCourses = [];
      let jsCourses = [];
      for (let i of allCourses) {
        if (i.tags.includes("ui")) {
          totalCourses.push(i);
        }
        if (i.tags.includes("javascript")) {
          jsCourses.push(i);
        }
      }
      setUiCourses(totalCourses);
      setJsCourses(jsCourses);
      setLoading(false);
    }
  }, [allCourses]);

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3500,
    pauseOnHover: true,
    centerMode: true,
    centerPadding: "40px",
    slidesToShow: 4,
    slidesToScroll: 0.5,
    speed: 500,
    ease: "ease-in-out",
    responsive: [
      {
        breakpoint: 324,
        settings: {
          slidesToShow: 1,
          centerPadding: "10px",
        },
      },
      {
        breakpoint: 454,
        settings: {
          slidesToShow: 1,
          centerPadding: "40px",
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          centerPadding: "100px",
        },
      },
      {
        breakpoint: 914,
        settings: {
          slidesToShow: 2,
          centerPadding: "100px",
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          centerPadding: "50px",
        },
      },
      {
        breakpoint: 1700,
        settings: {
          slidesToShow: 3,
          centerPadding: "60px",
        },
      },
    ],
  };

  if (loading) {
    return (
      <>
        <Loader />
      </>
    );
  } else {
    return (
      <div className='mt-24'>
        {/* <div className='text-center'>Dashboard</div> */}
        <div className='w-screen mx-auto mt-12'>
          <div className='my-3 text-2xl text-blue-500 ml-12 font-semibold'>
            New Courses
          </div>
          <Slider {...settings}>
            {courses.map((courseData, index) => (
              <div key={index}>
                <Card courseData={courseData} />
              </div>
            ))}
          </Slider>
        </div>
        <div className='w-screen mx-auto mt-12 mb-24'>
          <div className='my-3 text-2xl text-blue-500 ml-12 font-semibold'>
            UI Courses
          </div>
          <Slider {...settings}>
            {uiCourses.map((courseData, index) => (
              <div key={index}>
                <Card courseData={courseData} />
              </div>
            ))}
          </Slider>
        </div>
        <div className='w-screen mx-auto mt-12 mb-24'>
          <div className='my-3 text-2xl text-blue-500 ml-12 font-semibold'>
            Javascript Courses
          </div>
          <Slider {...settings}>
            {jsCourses.map((courseData, index) => (
              <div key={index}>
                <Card courseData={courseData} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    );
  }
};

export default Dashboard;
