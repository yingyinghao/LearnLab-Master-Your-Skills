import React, {useState, useEffect} from "react";
import {getFirestore, collection, getDocs} from "firebase/firestore";
import Card from "../components/Card";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const db = getFirestore();

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [uiCourses, setUiCourses] = useState([]);

  useEffect(() => {
    const getCourses = async () => {
      const coursesSnapshot = await getDocs(collection(db, "courses"));
      const coursesData = coursesSnapshot.docs.map((doc) => {
        return {id: doc.id, ...doc.data()};
      });
      setCourses(coursesData);
      // setLoading(false);
    };

    const getUiCourses = async () => {
      if (courses) {
        let totalCourses = [];
        for (let i of courses) {
          if (i.tags.includes("ui")) {
            totalCourses.push(i);
          }
        }
        setUiCourses(totalCourses);
        setLoading(false);
      }
    };
    getCourses();
    getUiCourses();
  }, [courses]);

  // useEffect(() => {
  //   if (Data) {
  //     let totalCourses = [];
  //     for (let i of Data) {
  //       console.log(i);
  //       if (i.tags.includes("react")) {
  //         totalCourses.push(i);
  //       }
  //     }
  //     setReactCourses(totalCourses);
  //     setLoading(false);
  //   }
  // }, []);

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
        breakpoint: 284,
        settings: {
          slidesToShow: 1,
          centerPadding: "10px",
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          centerPadding: "50px",
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
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          centerPadding: "100px",
        },
      },
    ],
  };

  if (loading) {
    return (
      <>
        <div className='mt-24'>Loading...</div>
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
      </div>
    );
  }
};

export default Dashboard;
