import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import React from "react";
import Slider from "react-slick";
import { Center, Flex } from "@chakra-ui/react";

function HomeBannerCarousel() {
  const settings = {
    infinite: true,
    speed: 500,
    centerMode: true,
    centerPadding: "0px",
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  const posts = [
    {
      title: "Post 1",
      decription: `
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem doloremque laborum sapiente cupiditate corporis aliquam possimus consequatur pariatur maxime, iure esse quia a cumque id temporibus, quisquam tempore. Quod, non?`,
      image:
        "https://img.freepik.com/free-photo/circuit-cyberspace-closeup-with-neon-lights_90220-1200.jpg?t=st=1697200585~exp=1697204185~hmac=6b7064f3bdc74874b2a8202b6f52ca27bd83d31926b89dc0a1e9d6043f57303a&w=740",
    },
    {
      title: "Post 2",
      decription: `
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem doloremque laborum sapiente cupiditate corporis aliquam possimus consequatur pariatur maxime, iure esse quia a cumque id temporibus, quisquam tempore. Quod, non?`,
      image:
        "https://img.freepik.com/free-photo/three-african-men-with-red-blankets-wrapped-around-them_181624-36644.jpg?w=740&t=st=1696515331~exp=1696515931~hmac=46eee8fea8e61c74bce957ef7fe07cfcf0fe816b38dae7a74c1087ae62b645e1",
    },
    {
      title: "Post 3",
      decription: `
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem doloremque laborum sapiente cupiditate corporis aliquam possimus consequatur pariatur maxime, iure esse quia a cumque id temporibus, quisquam tempore. Quod, non?`,
      image:
        "https://img.freepik.com/free-photo/spanish-team-with-world-cup-trophy_23-2150742267.jpg?t=st=1695997666~exp=1696001266~hmac=a4c8a9c91b6018634fe585b1f6f3cdafec3c6cc81021fbaa60f22fd28f94e623&w=900",
    },
    // Add more posts as needed
  ];

  return (
    <div className="w-[80vw] md:w-full my-2 md:mt-0">
      <Slider {...settings}>
        {posts.map((post, index) => (
          <div
            key={index}
            className="relative  h-[200px]  md:h-[150px] lg:h-[500px] xl:h-[600px]"
          >
            <div
              className="absolute w-full inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${post.image})`,
              }}
            ></div>
            <div className="absolute w-full h-full text-[12px]   flex-col inset-0 flex items-start justify-end p-5 text-white ">
              <Flex direction={"column"} className="  items-start">
                <h2 className="text-2xl md:text-xl lg:text-4xl xl:text-5xl font-bold">
                  {post.title}
                </h2>
                <h3>{post.decription.slice(0, 100) + "..."}</h3>
              </Flex>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default HomeBannerCarousel;
