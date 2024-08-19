import { Slide } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import { MessageText, PromotionsContainer } from "../../styles/promotionsStyles";

const messages = [
  "20% off on your first order!",
  "Aadi sale starts Now Visit Any time to Purchase",
  "Do You Like My Webpage :)",
];

export default function Promotions() {
  const containerRef = useRef();
  const [show, setShow] = useState(true);
  const [messageIndex, setMessageIndex] = useState(0);
  const [direction, setDirection] = useState("left");

  useEffect(() => {
    // Function to handle message transitions
    const handleTransition = () => {
      setShow(false);
      setTimeout(() => {
        setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
        setDirection("left"); // Set direction for new message
        setShow(true);
      }, 500); // Match the exit animation duration

      setTimeout(() => {
        setShow(false);
        setDirection("right"); // Set direction for the next message
      }, 3500); // Match the duration of the message display
    };

    const intervalId = setInterval(handleTransition, 4000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <PromotionsContainer ref={containerRef} overflow="hidden">
      <Slide
        direction={direction}
        in={show}
        container={containerRef.current}
        timeout={{
          enter: 500,
          exit: 500, 
        }}
      >
        <Box display="flex" justifyContent="center" alignItems="center">
          <MessageText>
            {messages[messageIndex]}
          </MessageText>
        </Box>
      </Slide>
    </PromotionsContainer>
  );
}
