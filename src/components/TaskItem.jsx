/* eslint-disable react/prop-types */
import { Checkbox, HStack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

/**
 * Componente que representa um item de tarefa.
 *
 * @param {Object} props.task - Objeto que representa a tarefa.
 * @param {string} props.task.text - Texto da tarefa.
 * @param {number} props.task.deadline - Prazo da tarefa em milissegundos.
 * @param {boolean} props.task.completed - Indica se a tarefa está completa.
 * @param {Function} props.onComplete - Função chamada quando a tarefa é marcada como completa.
 * @param {boolean} props.completed - Indica se a tarefa está completa (usado para estilização).
 */
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

  /**
   * Calcula o tempo restante até o prazo da tarefa.
   *
   * @param {number} deadline - Prazo da tarefa em milissegundos.
   * @returns {Object} Objeto contendo o tempo restante em dias, horas, minutos e segundos.
   */
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

  /**
   * Formata o tempo restante em uma string legível.
   *
   * @param {Object} timeLeft - Objeto contendo o tempo restante em dias, horas, minutos e segundos.
   * @returns {string} String formatada representando o tempo restante.
   */
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
