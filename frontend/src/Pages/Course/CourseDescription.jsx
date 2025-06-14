import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  Icon,
  useToast,
} from "@chakra-ui/react";
import { FaChalkboardTeacher, FaPlayCircle } from "react-icons/fa";
import HomeLayout from "../../Layouts/HomeLayout";
import toast from "react-hot-toast";

function CourseDescription() {
  const toast = useToast();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { role, data } = useSelector((state) => state.auth);

  return (
    <HomeLayout>
      <Box
        className="min-h-[81vh] my-8 lg:my-0 lg:min-h-[76vh]"
        justifyContent={"center"}
        pt={14}
        px={{ base: 4, md: 20 }}
      >
        <Heading className="bold text-5xl text-center my-8 text-gray-700">
          Craft Your Skills with Course Crafter
        </Heading>
        <Flex
          direction={{ base: "column", lg: "row" }}
          align="center"
          justify="center"
          my={14}
          px={{ base: 5, md: 10, lg: 20 }}
          gap={10}
        >
          {/* Left Side: Course Info */}
          <Box flex={1} textAlign={{ base: "center", lg: "left" }}>
            <Heading as="h2" size="xl" color="blue.600" mb={4}>
              {state?.title}
            </Heading>
            <Text fontSize="lg" mb={2}>
              {state?.description}
            </Text>
            <Flex
              align="center"
              gap={3}
              mt={4}
              direction="column"
              alignItems={{ base: "center", lg: "flex-start" }}
            >
              <Flex align="center" gap={2}>
                <Icon as={FaChalkboardTeacher} color="blue.500" />
                <Text fontWeight="bold">Instructor: {state?.createdBy}</Text>
              </Flex>
              <Flex align="center" gap={2}>
                <Icon as={FaPlayCircle} color="blue.500" />
                <Text fontWeight="bold">
                  Total Lectures: {state?.numberOfLectures}
                </Text>
              </Flex>
            </Flex>
            {/* Action Button */}
            <Button
              mt={6}
              colorScheme="orange"
              size="lg"
              onClick={() => {
                if (state?.numberOfLectures === 0) {
                  
                  toast.info("There are no lectures available in this course.");
                  return;
                }

                if (
                  role === "ADMIN" ||
                  data?.subscription?.status === "active"
                ) {
                  navigate("/course/displaylectures", { state: { ...state } });
                } else {
                  navigate("/checkout");
                }
              }}
              _hover={{ transform: "scale(1.05)" }}
            >
              {role === "ADMIN" || data?.subscription?.status === "active"
                ? "Watch Lectures"
                : "Enroll Now"}
            </Button>
          </Box>

          {/* Right Side: Course Thumbnail with Floating Icons */}
          <Box
            flex={1}
            position="relative"
            borderRadius={"lg"}
            textAlign="center"
          >
            <Image
              loading="lazy"
              src={state?.thumbnail?.secure_url}
              alt="Course Thumbnail"
              borderRadius="lg"
              boxShadow="0 4px 15px rgba(128, 128, 128, 0.3), 0 6px 30px rgba(0, 0, 0, 0.2)"
              objectFit="cover"
              w="100%"
              maxW="500px"
              maxH="300px"
              mx="auto"
            />
          </Box>
        </Flex>
      </Box>
    </HomeLayout>
  );
}

export default CourseDescription;
