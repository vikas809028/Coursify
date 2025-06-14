import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Box, Image, Text, Flex, IconButton } from "@chakra-ui/react";
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";
import { useRef } from "react";
import amazon from "../Assets/amazon.png"
import facebook from "../Assets/facebook.png"
import tesla from "../Assets/tesla.png"
import google from "../Assets/google.jpg"
import microsof from "../Assets/microsof.jpg"
const achievers = [
  {
    id: 1,
    name: "Jeff Bezos",
    company: "Amazon",
    package: "30 LPA",
    rating: 5,
    image: amazon,
  },
  {
    id: 2,
    name: "Mark Juckerberg",
    company: "Facebook",
    package: "25 LPA",
    rating: 4.5,
    image: facebook,
  },
  {
    id: 3,
    name: "Elon Musk",
    company: "Tesla",
    package: "20 LPA",
    rating: 4,
    image: tesla,
  },
  {
    id: 4,
    name: "Sundar Pichai",
    company: "Google",
    package: "22 LPA",
    rating: 4.7,
    image: google,
  },
  {
    id: 5,
    name: "Satya Nandela",
    company: "Microsoft",
    package: "28 LPA",
    rating: 5,
    image: microsof,
  },
];

const AchieversCarousel = () => {
  const swiperRef = useRef(null);

  const goNext = () => {
    if (swiperRef.current) swiperRef.current.slideNext();
  };

  const goPrev = () => {
    if (swiperRef.current) swiperRef.current.slidePrev();
  };

  return (
    
      <Flex justify="space-between" position={"relative"} px={{base:"2px",md:8}} align="center" mb={4}>
        <IconButton
          mr={{sm:"0px",md:4}}
          aria-label="Previous"
          icon={<FaChevronLeft />}
          bg="blue.500"
          color="white"
          borderRadius={"full"}
          _hover={{ bg: "blue.600" }}
          onClick={goPrev}
        />

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          autoplay={{ delay: 3000 }}
          breakpoints={{
            640: { slidesPerView: 1 },
            1024: { slidesPerView: 3 },
          }}
          className="rounded-lg overflow-hidden"
        >
          {achievers.map((achiever) => (
            <SwiperSlide key={achiever.id}>
              <Box
                p={6}
                borderRadius="3xl"
                minW={{base:"250px",md:"300px"}}
                textAlign="center"
                bg={"gray.100"}
                boxShadow="lg"
                mx={2}
                my={6}
              >
                <Image loading="lazy"
                  src={achiever.image}
                  borderRadius="full"
                  objectFit="cover"
                  boxSize="200px"
                  mx="auto"
                />
                <Text fontSize="xl" fontWeight="bold" mt={2}>
                  {achiever.name}
                </Text>
                <Text fontSize="md">{achiever.company}</Text>
                <Text fontSize="sm" fontWeight="semibold">
                  💰 {achiever.package}
                </Text>
                <Flex justify="center" mt={2}>
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      color={i < achiever.rating ? "gold" : "gray"}
                      size={20}
                    />
                  ))}
                </Flex>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
        <IconButton
         
          ml={{sm:"0px",md:4}}
          aria-label="Next"
          icon={<FaChevronRight />}
          borderRadius={"full"}

          bg="blue.500"
          color="white"
          _hover={{ bg: "blue.600" }}
          onClick={goNext}
        />
      </Flex>

    
  );
};

export default AchieversCarousel;
