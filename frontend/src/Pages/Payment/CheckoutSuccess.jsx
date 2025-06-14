import { useEffect, useState } from "react";
import { AiFillCheckCircle, AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Icon,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  VStack,
  Image,
  IconButton,
} from "@chakra-ui/react";
import HomeLayout from "../../Layouts/HomeLayout";
import { getUserData } from "../../Redux/Slices/AuthSlice";
import congrats from "../../Assets/congrats.gif";

function CheckoutSuccess() {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getUserData());
    setTimeout(() => {
      onOpen(); // Open the modal after a delay
      setLoading(false);
    }, 1000);
  }, [dispatch, onOpen]);

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
          <Heading fontSize="3xl" fontWeight="bold" color="green.400">
            🎉 Payment Successful!
          </Heading>

          <VStack spacing={4} mt={6}>
            <Icon as={AiFillCheckCircle} boxSize={16} color="green.400" />
            <Text fontSize="lg">
              Welcome to the <strong>Pro Bundle</strong>! 🎊 You now have unlimited access to all courses.
            </Text>
          </VStack>

          <Button
            mt={6}
            w="full"
            colorScheme="green"
            size="lg"
            fontSize="xl"
            fontWeight="bold"
            _hover={{ transform: "scale(1.05)", transition: "0.2s" }}
            as={Link}
            to="/courses"
          >
            Go to Dashboard
          </Button>
        </Box>
      </Flex>

      {/* 🎁 Success Modal with Goodies */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bg="#5e6be6" minH="60vh" width="70vw" color="white" borderRadius="lg" position="relative">
          
          {/* Close Button (React Icon) */}
          <IconButton
            aria-label="Close modal"
            icon={<AiOutlineClose size={20} />}
            position="absolute"
            top={3}
            right={3}
            size="sm"
            variant="ghost"
            color="white"
            _hover={{ bg: "gray.700" }}
            onClick={onClose}
          />

          <ModalHeader textAlign="center" fontSize="2xl" fontWeight="bold">
            🏆 Congratulations!
          </ModalHeader>

          <ModalBody textAlign="center">
            <Text fontSize="lg">
              You’ve successfully subscribed to the <strong>Pro Bundle</strong>! 🚀  
              Enjoy access to all our premium courses.  
            </Text>
            <Text fontSize="md" color="green.300" mt={4}>
              🎁 Your welcome goodies:  
              <br/>
              ✅ <strong>Exclusive Learning Resources</strong>  
              <br/> 
              ✅ <strong>Priority Support</strong>  
              <br/> 
              ✅ <strong>Bonus Study Materials</strong>  
            </Text>

            <Image loading="lazy" src={congrats} alt="Congrats" mt={6} w={200} h={150} borderRadius="3xl" mx="auto" />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="green" w="full" onClick={onClose}>
              Start Learning 🚀
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </HomeLayout>
  );
}

export default CheckoutSuccess;
