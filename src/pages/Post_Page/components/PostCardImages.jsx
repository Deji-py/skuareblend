import "yet-another-react-lightbox/styles.css";
import Lightbox from "yet-another-react-lightbox";
import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { Box, Center, Flex, Grid, GridItem, Image } from "@chakra-ui/react";

function CustomDots({ activeIndex, totalDots, onClickDot }) {
  const dotsToShow = 3;
  const indicatorRef = useRef();

  useEffect(() => {
    if (indicatorRef.current) {
      // Calculate the index of the next dot to reveal
      const nextIndex = Math.min(activeIndex + 1, totalDots - 1);

      // Calculate the position of the next dot within the container
      let nextDotPosition = nextIndex * 8; // Assuming each dot is 25px wide
      if (nextIndex < 4) {
        nextDotPosition = nextIndex;
      }

      // Scroll to reveal the next dot

      indicatorRef.current.scrollTo({
        left: nextDotPosition,
        behavior: "smooth",
      });
    }
  }, [activeIndex, totalDots]);

  const renderDots = () => {
    const dots = [];
    for (let i = 0; i < totalDots; i++) {
      const isLastDot = i === totalDots - 1;
      const isSmallDot = i >= dotsToShow && isLastDot;

      dots.push(
        <div
          key={i}
          className={`custom-dot w-1 h-1 rounded-full mx-1 ${
            activeIndex === i ? "bg-primary" : "bg-gray-200"
          } ${isSmallDot ? "small-dot" : ""}`}
          onClick={() => onClickDot(i)}
        />
      );
    }
    return dots;
  };

  return (
    <Center>
      <Flex
        gap={2}
        className="w-[50px] hideScroll"
        style={{ overflowX: "auto" }}
        ref={indicatorRef}
      >
        <Flex className="custom-dots">{renderDots()}</Flex>
      </Flex>
    </Center>
  );
}

function PostCardImages({ item }) {
  const imagesLength = item?.images ? item.images.length : 0;
  const [open, setOpen] = useState(false);

  const [activeSlide, setActiveSlide] = useState(0);

  const carouselSettings = {
    dots: false,
    arrows: true,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    speed: 10,
    afterChange: (index) => setActiveSlide(index),
  };

  const goToSlide = (index) => {
    setActiveSlide(index);
    slider.slickGoTo(index);
  };

  let slider;

  if (imagesLength === 1) {
    // Use normal sizing for 1 image
    return (
      <div>
        <Lightbox
          open={open}
          styles={{
            container: {
              backgroundColor: "white",
              height: "100%",
            },
            button: { color: "white", boxShadow: "none" },
            icon: { boxShadow: "none", width: "20px" },
          }}
          close={() => setOpen(false)}
          slides={item?.images}
        />

        {item.images.map((image, index) => (
          <button
            key={index}
            onClick={() => setOpen(true)}
            className="w-full  overflow-hidden  bg-gray-100"
          >
            <Box key={index} className="w-full overflow-hidden  bg-gray-100">
              <Image
                alt="postImg"
                className="w-full h-full object-cover"
                src={image?.src}
              />
            </Box>
          </button>
        ))}
      </div>
    );
  }

  if (imagesLength === 2 || imagesLength === 4) {
    // Use normal sizing for 1 image
    return (
      <Grid gap={1} gridTemplateColumns={"repeat(2 ,1fr)"}>
        <Lightbox
          open={open}
          styles={{
            container: {
              backgroundColor: "white",
              height: "100%",
            },
            button: { color: "black", boxShadow: "none" },
            icon: { boxShadow: "none", width: "20px" },
          }}
          close={() => setOpen(false)}
          slides={item?.images}
        />

        {item.images.map((image, index) => (
          <GridItem
            key={index}
            onClick={() => setOpen(true)}
            className="  overflow-hidden bg-gray-100"
          >
            <Box
              key={index}
              className="w-full h-[200px] overflow-hidden bg-gray-100"
            >
              <Image
                alt="postImg"
                className="w-full h-full object-cover"
                src={image?.src}
              />
            </Box>
          </GridItem>
        ))}
      </Grid>
    );
  } else {
    // Use the react-slick carousel for 2 or more images
    return (
      <div>
        <Lightbox
          open={open}
          styles={{
            container: { backgroundColor: "black", padding: 30 },
            button: { color: "white", boxShadow: "none" },
            icon: { boxShadow: "none", width: "20px" },
          }}
          close={() => setOpen(false)}
          slides={[item?.images[activeSlide]]}
        />
        <Slider {...carouselSettings} ref={(c) => (slider = c)}>
          {item.images.map((image, index) => (
            <>
              <button
                key={index}
                onClick={() => setOpen(true)}
                className="w-full  overflow-hidden h-[450px] bg-gray-100"
              >
                <Image
                  alt="postImg"
                  className="w-full h-full object-cover"
                  src={image?.src}
                />
              </button>
            </>
          ))}
        </Slider>
        <CustomDots
          activeIndex={activeSlide}
          totalDots={imagesLength}
          onClickDot={goToSlide}
        />
      </div>
    );
  }
}

export default PostCardImages;
