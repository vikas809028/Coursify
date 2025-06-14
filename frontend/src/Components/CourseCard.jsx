import { useNavigate } from "react-router-dom";
import {
  Box,
  Image,
  Text,
  VStack,
  Button,
  Flex,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { FiArrowRight } from "react-icons/fi";

function CourseCard({ data }) {
  const navigate = useNavigate();

  return (
    <Box
      onClick={() => navigate("/course/description/", { state: { ...data } })}
      width="100%"
      maxW="375px"
      minH="fit-content"
      shadow="lg"
      rounded="lg"
      cursor="pointer"
      bg="white"
      p={2}
      mx={2}
      overflow="hidden"
      _hover={{ transform: "scale(1.02)" }}
      transition="transform 0.2s ease-in-out"
      display="flex"
      flexDirection="column"
    >
      {/* Image with Fixed Aspect Ratio */}
      <Box width="100%" aspectRatio={16 / 10} overflow="hidden" rounded="lg">
        <Image loading="lazy"
          src={data?.thumbnail?.secure_url}
          alt="course thumbnail"
          width="100%"
          height="100%"
        />
      </Box>

      {/* Content Section */}
      <VStack
        spacing={2}
        align="start"
        flexGrow={1}
        my={2}
        px={2}
        justifyContent="space-between"
        width="100%"
      >
        <Text fontWeight="bold" fontSize="xl" py={1} noOfLines={1}>
          {data?.category}
        </Text>
        <Text fontSize="md" noOfLines={3} color="gray.600">
          {data?.description}
        </Text>

        {/* Explore Button */}
        <Flex justify="flex-start" width="100%" mt="auto">
          <Button
            rightIcon={<FiArrowRight />}
            variant="solid"
            colorScheme="blue"
            onClick={(e) => {
              e.stopPropagation(); 
              navigate("/course/description/", { state: { ...data } });
            }}
          >
            Explore
          </Button>
        </Flex>
      </VStack>
    </Box>
  );
}

export default CourseCard;
