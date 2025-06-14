import { RxCrossCircled } from "react-icons/rx";
import { Link } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Icon,
  VStack,
} from "@chakra-ui/react";
import HomeLayout from "../../Layouts/HomeLayout";

function CheckoutFailure() {
  return (
    <HomeLayout>
      <Flex align="center" justify="center" className="min-h-[81vh] lg:min-h-[76vh]" px={4}>
        <Box
          bg="white"
          backdropFilter="blur(10px)"
          borderRadius="lg"
          boxShadow="lg"
          maxW="md"
          w="full"
          p={8}
          textAlign="center"
        >
          <Heading fontSize="3xl" fontWeight="bold" color="red.500">
            ❌ Payment Failed!
          </Heading>

          <VStack spacing={4} mt={6}>
            <Icon as={RxCrossCircled} boxSize={16} color="red.500" />
            <Text fontSize="lg">
              Oops! Your payment could not be processed.  
              Please try again later.
            </Text>
          </VStack>

          <Button
            mt={6}
            w="full"
            colorScheme="red"
            size="lg"
            fontSize="xl"
            fontWeight="bold"
            _hover={{ transform: "scale(1.05)", transition: "0.2s" }}
            as={Link}
            to="/checkout"
          >
            Try Again
          </Button>
        </Box>
      </Flex>
    </HomeLayout>
  );
}

export default CheckoutFailure;
