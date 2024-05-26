/* eslint-disable react/prop-types */
import { Checkbox, HStack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function TaskItem({ task, onComplete, completed }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(task.deadline));

  useEffect(() => {
    if (!completed) {
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft(task.deadline));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [task.deadline, completed]);

  function calculateTimeLeft(deadline) {
    const difference = deadline - new Date().getTime();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  function formatTimeLeft(timeLeft) {
    if (
      timeLeft.days === 0 &&
      timeLeft.hours === 0 &&
      timeLeft.minutes === 0 &&
      timeLeft.seconds === 0
    ) {
      return "prazo expirado";
    }
    return `${timeLeft.days || 0}d ${timeLeft.hours || 0}h ${
      timeLeft.minutes || 0
    }m ${timeLeft.seconds || 0}s`;
  }

  return (
    <HStack
      justify="space-between"
      p={4}
      borderWidth="1px"
      borderRadius="md"
      bg={completed ? "gray.100" : "white"}
    >
      <Checkbox isChecked={task.completed} onMouseUp={onComplete} />
      <Text as={completed ? "s" : "span"} flexGrow={1}>
        {task.text}
      </Text>
      {!completed && <Text>{formatTimeLeft(timeLeft)}</Text>}
    </HStack>
  );
}
