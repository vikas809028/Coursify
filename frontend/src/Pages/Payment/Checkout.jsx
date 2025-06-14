import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiRupee } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Input,
  Spinner,
  Text,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  InputGroup,
  InputRightElement,
  Tooltip,
} from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
import HomeLayout from "../../Layouts/HomeLayout";
import {
  getRazorPayId,
  purchaseCourseBundle,
  verifyUserPayment,
} from "../../Redux/Slices/RazorpaySlice";

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const razorpayKey = useSelector((state) => state?.razorpay?.key);
  const subscription_id = useSelector(
    (state) => state?.razorpay?.subscription_id
  );

  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasHovered, setHasHovered] = useState(false);
  const [couponCode, setCouponCode] = useState("SAVE3000");
  const [enteredCoupon, setEnteredCoupon] = useState("");
  const [price, setPrice] = useState(12999);
  const [discountedPrice, setDiscountedPrice] = useState(12999);

  useEffect(() => {
    async function load() {
      try {
        await dispatch(getRazorPayId());
        await dispatch(purchaseCourseBundle());
      } catch (error) {
        toast.error("Failed to load payment details. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleFirstHover = () => {
    if (!hasHovered) {
      setIsModalOpen(true);
      setHasHovered(true);
    }
  };

  const handleCopyCoupon = () => {
    navigator.clipboard.writeText(couponCode);
    toast.success("Coupon copied!");
  };

  const applyCoupon = () => {
    if (enteredCoupon.trim().toUpperCase() === "SAVE3000") {
      setDiscountedPrice(9999);
      toast.success(
        <div className="text-center p-2">
          Coupon Applied! <br /> ₹3000 Discount Activated.
        </div>
      );
      setEnteredCoupon("");
    } else {
      toast.error("Invalid Coupon Code");
    }
  };

  async function handleSubscription(e) {
    e.preventDefault();
    if (!razorpayKey || !subscription_id) {
      toast.error("Unable to process payment. Please try again.");
      return;
    }

    const options = {
      key: razorpayKey,
      subscription_id: subscription_id,
      name: "CourseCrafter Pvt. Ltd.",
      description: "Subscription",
      theme: {
        color: "#007BFF",
      },
      handler: async function (response) {
        const paymentDetails = {
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          razorpay_subscription_id: response.razorpay_subscription_id,
        };
        toast.success("Payment successful!");
        const res = await dispatch(verifyUserPayment(paymentDetails));
        res?.payload?.success
          ? navigate("/checkout/success")
          : navigate("/checkout/fail");
      },
      method: {
        netbanking: true,
        card: true,
        upi: true, 
        wallet: true,
      },
      upi: {
        mode: "qr", 
        force: true,
      },
    };
    

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  if (loading) {
    return (
      <HomeLayout>
        <Flex
          align="center"
          justify="center"
          className="min-h-[80vh] lg:min-h-[76vh]"
        >
          <Spinner size="xl" color="yellow.500" />
        </Flex>
      </HomeLayout>
    );
  }

  return (
    <HomeLayout>
      <Flex
        align="center"
        justify="center"
        className="min-h-[81vh] lg:min-h-[76vh]"
        px={4}
      >
        <Box
          bg="white"
          backdropFilter="blur(10px)"
          borderRadius="lg"
          boxShadow="lg"
          maxW="lg"
          w="full"
          p={8}
          textAlign="center"
          position="relative"
          onMouseEnter={handleFirstHover}
        >
          <Heading fontSize="3xl" fontWeight="bold">
            🎉 Unlock All Courses
          </Heading>

          <VStack spacing={5} mt={6}>
            <Text fontSize="lg">
              Get{" "}
              <Text as="span" fontWeight="bold">
                unlimited access
              </Text>{" "}
              to all current and future courses for 1 Year.
            </Text>

            {/* Price Display */}
            {discountedPrice === price ? (
              // Show only real price before applying coupon
              <Text fontSize="3xl" fontWeight="bold" color="gray.600">
                <Icon as={BiRupee} /> {price} Only
              </Text>
            ) : (
              // Show both prices after applying coupon
              <VStack spacing={1}>
                <Text fontSize="2xl" fontWeight="bold" color="gray.600">
                  <Icon as={BiRupee} />
                  <Text as="s">{price}</Text>
                </Text>
                <Text fontSize="3xl" fontWeight="bold" color="green.400">
                  <Icon as={BiRupee} /> {discountedPrice} Only
                </Text>
              </VStack>
            )}

            <Text fontSize="sm" color="gray.800">
              ✅ Full Refund on Cancellation <br /> * Terms & Conditions Apply *
            </Text>
          </VStack>

          {discountedPrice === price && (
            <>
              <Text
                fontSize={{ sm: "md", md: "lg" }}
                fontWeight="bold"
                mt={4}
                p={4}
              >
                Apply Coupon Code:
              </Text>
              {/* Apply Coupon Section inside Card */}
              <Flex mt={2} p={4} borderRadius="md">
                <InputGroup size="md">
                  <Input
                    placeholder="Enter coupon code"
                    value={enteredCoupon}
                    onChange={(e) => setEnteredCoupon(e.target.value)}
                  />
                </InputGroup>
                <button
                  onClick={applyCoupon}
                  isDisabled={discountedPrice === 9999}
                  className="bg-blue-600 text-white p-2 mx-2 rounded-lg box-border"
                >
                  Apply
                </button>
              </Flex>
            </>
          )}

          <Button
            mt={6}
            w="full"
            colorScheme="blue"
            size="lg"
            fontSize="xl"
            fontWeight="bold"
            _hover={{ transform: "scale(1.05)", transition: "0.2s" }}
            onClick={handleSubscription}
          >
            Buy Now
          </Button>

          {/* Coupon Modal - Opens only on first hover */}
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            isCentered
          >
            <ModalOverlay backdropFilter="blur(5px)" />
            <ModalContent
              bg="white"
              boxShadow="lg"
              borderRadius="lg"
              p={6}
              textAlign="center"
              maxW="sm"
            >
              <ModalHeader fontSize="xl" fontWeight="bold" color="blue.600">
                🎉 Special Discount
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text fontSize="lg" fontWeight="bold" mb={2}>
                  Use this code for ₹3000 OFF!
                </Text>

                <InputGroup size="md">
                  <Input value={couponCode} isReadOnly />
                  <InputRightElement>
                    <Tooltip label="Copy Coupon" fontSize="sm">
                      <Button
                        size="sm"
                        onClick={() => {
                          handleCopyCoupon();
                          setIsModalOpen(false); // Close modal after copying
                        }}
                      >
                        <CopyIcon />
                      </Button>
                    </Tooltip>
                  </InputRightElement>
                </InputGroup>
              </ModalBody>
            </ModalContent>
          </Modal>
        </Box>
      </Flex>
    </HomeLayout>
  );
}

export default Checkout;
