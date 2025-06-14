import { Box, Flex, Image, Text, Heading, Link } from "@chakra-ui/react";

function CarouselSlide({ image, title, description, slideNumber, totalSlides }) {
  return (
    <Box id={`slide${slideNumber}`} position="relative" w="full" className="carousel-item">
      <Flex
        direction="column"
        align="center"
        justify="center"
        gap={4}
        px="15%"
        my={8}
      >
        <Image loading="lazy"
          src={image}
          boxSize="12rem"
          p={2}
          borderRadius="full"
          border="2px solid"
          borderColor="gray.400"
        />
        <Text fontSize={{base:"md",lg:"xl"}} textAlign="center">
          {description}
        </Text>
        <Heading fontSize="2xl" fontWeight="semibold" textAlign="center">
          {title}
        </Heading>
        <Flex
          position="absolute"
          justify="space-between"
          transform="translateY(-50%)"
          left={5}
          right={5}
          top="50%"
        >
          <Link
            href={`#slide${slideNumber === 1 ? totalSlides : slideNumber - 1}`}
            className="btn btn-circle "
          >
            ❮
          </Link>
          <Link
            href={`#slide${(slideNumber % totalSlides) + 1}`}
            className="btn btn-circle"
          >
            ❯
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
}

export default CarouselSlide;
