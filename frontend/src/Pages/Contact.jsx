import { useState } from "react";
import { toast } from "react-hot-toast";
import axiosInstance from "../Helpers/axiosInstance";
import { isEmail } from "../Helpers/regexMatcher";
import HomeLayout from "../Layouts/HomeLayout";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Heading,
  Image,
} from "@chakra-ui/react";
import contactImage from "../Assets/loginImage.png"; // Replace with actual image

function Contact() {
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();
    if (!userInput.email || !userInput.name || !userInput.message) {
      toast.error("All fields are mandatory");
      return;
    }

    if (!isEmail(userInput.email)) {
      toast.error("Invalid email");
      return;
    }

    try {
      const response = axiosInstance.post("/contact", userInput);
      toast.promise(response, {
        loading: "Submitting your message...",
        success: "Form submitted successfully",
        error: "Failed to submit the form",
      });
      const contactResponse = await response;
      if (contactResponse?.data?.success) {
        setUserInput({
          name: "",
          email: "",
          message: "",
        });
      }
    } catch (err) {
      toast.error("Operation failed...");
    }
  }

  return (
    <HomeLayout>
      <Flex
        className="flex flex-wrap flex-col gap-8 md:gap-4 md:flex-row py-16 lg:py-2 justify-around items-center lg:justify-around lg:min-h-[76vh] px-4"
      >
        {/* Contact Image */}
        <Box>
          <Image loading="lazy"
            src={contactImage}
            boxSize={{ sm: "400px", md: "400px", lg: "550px" }}
            objectFit={"contain"}
            borderRadius={"full"}
           
          />
        </Box>

        {/* Contact Form */}
        <Box
          as="form"
          noValidate
          onSubmit={onFormSubmit}
          className="flex flex-col gap-5 bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-md"
        >
          <Heading as="h1" size="lg" textAlign="center">
            Contact Us
          </Heading>

          {/* Name Input */}
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              id="name"
              type="text"
              name="name"
              placeholder="Enter your name"
              value={userInput.name}
              onChange={handleInputChange}
            />
          </FormControl>

          {/* Email Input */}
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={userInput.email}
              onChange={handleInputChange}
            />
          </FormControl>

          {/* Message Input */}
          <FormControl isRequired>
            <FormLabel>Message</FormLabel>
            <Textarea
              id="message"
              name="message"
              placeholder="Enter your message"
              value={userInput.message}
              onChange={handleInputChange}
              resize="none"
              h="120px"
            />
          </FormControl>

          {/* Submit Button */}
          <Button type="submit" colorScheme="blue" width="full">
            Submit
          </Button>
        </Box>
      </Flex>
    </HomeLayout>
  );
}

export default Contact;
