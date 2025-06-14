/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import CourseCard from "../../Components/CourseCard";
import HomeLayout from "../../Layouts/HomeLayout";
import { getAllCourses } from "../../Redux/Slices/CourseSlice";

function CourseList() {
  const dispatch = useDispatch();
  const { courseData } = useSelector((state) => state.course);

  async function loadCourses() {
    await dispatch(getAllCourses());
  }

  useEffect(() => {
    loadCourses();
  }, []);

  return (
    <HomeLayout>
      <Box minH="76vh" pt={14} px={{ base: 4, md: 20 }}>
        <Heading as="h1" textAlign="center" size="lg" mb={5}>
          Explore the courses made by{" "}
          <Text as="span" fontWeight="bold" color="yellow.500">
            Industry experts
          </Text>
        </Heading>
        <Flex wrap="wrap" gap={6} justify={"center"} my={10}>
          {courseData?.map((element) => (
            <CourseCard key={element._id} data={element} />
          ))}
        </Flex>
      </Box>
    </HomeLayout>
  );
}

export default CourseList;
