import { Box, Image, Text, VStack, Badge, Divider } from "@chakra-ui/react";

const EducationCard = ({ image, name, college, experience }) => {
  return (
    <Box
      p={4}
      px={10}
      m={6}
      borderRadius="lg"
      boxShadow="0px 10px 20px rgba(89, 97, 169, 0.5)"
      bgGradient="linear(to-b, white, blue.100)"
      color={"gray.700"}
      textAlign="center"
      maxW="300px"
      transition="all 0.3s ease-in-out"
      _hover={{
        transform: "translateZ(50px) scale(1.02)",
        boxShadow: "0px 15px 25px rgba(89, 97, 169, 0.7)",
        scale: 1.25,
      }}
    >
      <VStack spacing={4}>
        <Image loading="lazy"
          src={image}
          boxSize="150px"
          objectFit="cover"
          borderRadius="full"
          border="4px solid white"
        />
        <Text fontSize="xl" py={0} my={0} fontWeight="bold">
          {name}
          <br />
          {college}
        </Text>

        <Divider borderColor="whiteAlpha.500" />
        <Badge
          fontSize="md"
          colorScheme="yellow"
          px={4}
          py={1}
          borderRadius="full"
        >
          {experience}+ Years Experience
        </Badge>
      </VStack>
    </Box>
  );
};

export default EducationCard;
