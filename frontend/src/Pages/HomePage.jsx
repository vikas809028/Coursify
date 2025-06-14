import { Link } from "react-router-dom";
import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { Typewriter } from "react-simple-typewriter";
import HomePageImage from "../Assets/Images/homePageMainImage.png";
import Saurabh from "../Assets/saurabh.jpg";
import Vikas from "../Assets/Vikas.jpg";
import Vivek from "../Assets/Vivek.jpg";
import HomeLayout from "../Layouts/HomeLayout";
import { motion, useInView } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { getAllCoursesOnHompage } from "../Redux/Slices/CourseSlice";
import CourseCard from "../Components/CourseCard";
import { ChevronsRight } from "lucide-react";
import AudienceSection from "../Components/AudienceSection";
import EducationCard from "../Components/EducationCard";
import AchieversCarousel from "../Components/AchieversCarousel";
import { FaBullhorn } from "react-icons/fa";
function HomePage() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-10px" });
  const dispatch = useDispatch();
  const { courseData } = useSelector((state) => state.course);

  async function loadCourses() {
    await dispatch(getAllCoursesOnHompage());
  }

  useEffect(() => {
    loadCourses();
  }, []);
  return (
    <HomeLayout>
      {/* Image and Text */}
      <Flex
        mt={"50px"}
        direction={{ base: "column", lg: "row" }}
        align="center"
        justify="center"
        gap={{ base: 5, md: 10 }}
        mx={{ base: 4, md: 16 }}
        paddingTop={4}
        
      >
        <Box width={{ base: "100%", lg: "50%" }} textAlign="center" spacing={6}>
          <Heading
            fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
            fontWeight="bold"
          >
            Find out our{" "}
            <Typewriter
              words={["best", "valuable", "affordable"]}
              loop={100}
              cursor
              cursorStyle=""
              typeSpeed={250}
              deleteSpeed={200}
              delaySpeed={1000}
            />
          </Heading>

          <Text
            fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
            fontWeight="bold"
            style={{ color: "#D69E2E", fontWeight: "bold" }}
          >
            Online Courses
          </Text>
          <Text fontSize={{ base: "lg", md: "2xl" }} px={8} mt={4}>
            We have a large library of courses taught by highly skilled and
            qualified faculties at a very affordable cost.
          </Text>

          <Flex
            justify="center"
            gap={6}
            mt={6}
            display={{ base: "none", md: "flex" }}
          >
            <Link to="/courses">
              <button className="relative inline-flex items-center justify-center p-[1px] rounded-md group">
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-md"></span>

                <span className="relative block px-4 py-2 bg-white dark:bg-gray-800 rounded-md">
                  Explore our Courses
                </span>
              </button>
            </Link>
          </Flex>
        </Box>

        <Box
          width={{ base: "100%", lg: "50%" }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          marginTop={4}
        >
          <Image loading="lazy" alt="homepage image" src={HomePageImage} />
        </Box>
      </Flex>

      <AudienceSection />

      {/* Card Section */}
      <Flex
        px={4}
        py={8}
        marginTop={"2.5rem"}
        direction={"column"}
        gap={4}
        align="center"
        justify="center"
      >
        <Text className="text-3xl lg:text-4xl font-bold text-center">
          OUR COURSES
        </Text>
        <Flex className="flex-wrap justify-center  items-center mt-4 p-1 lg:p-8 gap-4">
          {courseData?.map((element) => (
            <CourseCard key={element._id} data={element} />
          ))}
        </Flex>
      </Flex>

      {/* Explore Button */}
      <Flex justifyContent={"center"}>
        <Link to="/courses">
          <button className="relative inline-flex items-center justify-center p-[1px] rounded-md group">
            <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-md"></span>

            <Flex className="relative block px-4 py-2 bg-white dark:bg-gray-800 rounded-md">
              Explore our Courses <ChevronsRight />
            </Flex>
          </button>
        </Link>
      </Flex>

      {/* educatoion section */}
      <Box className="py-4 my-8" ref={sectionRef}>
        <Text className="text-center text-3xl lg:text-4xl my-8 font-bold">
          Our Top Educators
        </Text>

        <Flex
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          alignItems="center"
          my={4}
          gap={6}
          position="relative"
        >
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <EducationCard
              image={Saurabh}
              name="Saurabh Tiwari"
              college="Lucknow University"
              experience={5}
              zIndex={1}
            />
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          >
            <EducationCard
              image={Vikas}
              name="Vikas Tiwari"
              college="A. K. T. U."
              experience={3}
              zIndex={2}
              isMiddle
            />
          </motion.div>

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          >
            <EducationCard
              image={Vivek}
              name="Vivek Pandey"
              college="A. K. T. U."
              experience={5}
              zIndex={1}
            />
          </motion.div>
        </Flex>
      </Box>

      <Flex
        alignItems={"center"}
        className="text-xl text-gray-700 gap-2 border-2 border-dashed p-1 border-blue-400"
      >
        <FaBullhorn size={24} color="black" />
        <marquee behavior="loop" direction="left">
          Data shown in achivers section is not correct as this project is for
          learning purpose
        </marquee>
      </Flex>

      {/* achivers section */}

      <Box className=" py-4 my-8">
        <Text className="text-center text-3xl lg:text-4xl my-8 font bg-clip-text font-bold">
          Our Achievers
        </Text>
        <AchieversCarousel />
      </Box>
      <section className="py-12 mt-8">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <details className="p-4 bg-white rounded-lg shadow">
              <summary className="font-semibold cursor-pointer">
                Question 1: How can I access courses?
              </summary>
              <p className="mt-2 text-gray-600">
                You can buy subscription and can access all the courses across
                the platform.
              </p>
            </details>
            <details className="p-4 bg-white rounded-lg shadow">
              <summary className="font-semibold cursor-pointer">
                Question 2: What payment methods do you accept?
              </summary>
              <p className="mt-2 text-gray-600">
                We accept various payment methods, including credit cards, debit
                cards, and online payment gateways.
              </p>
            </details>
            <details className="p-4 bg-white rounded-lg shadow">
              <summary className="font-semibold cursor-pointer">
                Question 3: What is the validaity of subscription?
              </summary>
              <p className="mt-2 text-gray-600">
                Subscription is valid for one year
              </p>
            </details>
            <details className="p-4 bg-white rounded-lg shadow">
              <summary className="font-semibold cursor-pointer">
                Question 4: Can I cancel subscription at any time?
              </summary>
              <p className="mt-2 text-gray-600">
                Yes , But you will get refunded only if you cancel within 7 days
                of subscription.
              </p>
            </details>
          </div>
        </div>
      </section>
    </HomeLayout>
  );
}

export default HomePage;
