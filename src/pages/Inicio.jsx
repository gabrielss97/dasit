import { useEffect, useState } from "react";
import {
  Box,
  Input,
  Button,
  VStack,
  HStack,
  Select,
  Text,
} from "@chakra-ui/react";
import Header from "../components/Header";
import TaskItem from "../components/TaskItem";

export default function Inicio() {
  const [task, setTask] = useState("");
  const [deadline, setDeadline] = useState("");
  const [tasks, setTasks] = useState(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    return storedTasks;
  });
  const [completedTasks, setCompletedTasks] = useState(() => {
    const storedCompletedTasks =
      JSON.parse(localStorage.getItem("completedTasks")) || [];
    return storedCompletedTasks;
  });

  // Salvar tarefas no localStorage sempre que a lista de tarefas mudar
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
  }, [completedTasks]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (task && deadline) {
      const newTask = {
        text: task,
        deadline: new Date().getTime() + deadline * 24 * 60 * 60 * 1000,
        completed: false,
        onTime: null,
      };
      setTasks([...tasks, newTask]);
      setTask("");
      setDeadline("");
    }
  };

  const handleCompleteTask = (index) => {
    const newTasks = tasks.map((task, i) => ({
      ...task,
      completed: i === index,
    }));
    const completedTask = newTasks.find((task) => task.completed);
    const remainingTasks = newTasks.filter((task) => !task.completed);

    setTasks(remainingTasks);
    setCompletedTasks([...completedTasks, completedTask]);
  };

  return (
    <>
      <Header />
      <Box p={4} maxW="700px" mx="auto">
        <VStack as="form" spacing={4} align="stretch" onSubmit={handleAddTask}>
          <HStack spacing={4}>
            <Input
              placeholder="O que você precisa fazer logo?"
              size="lg"
              flex="2"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <Select
              placeholder="Prazo"
              size="lg"
              flex="1"
              color="gray.500"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            >
              {[...Array(7)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1} dia{i + 1 > 1 ? "s" : ""}
                </option>
              ))}
            </Select>
          </HStack>
          <Button colorScheme="teal" size="lg" type="submit">
            Enviar
          </Button>
        </VStack>

        <Box mt={8}>
          <Text fontSize="2xl" mb={4}>
            A fazer:
          </Text>
          <VStack spacing={4} align="stretch">
            {tasks.map((task, index) => (
              <TaskItem
                key={index}
                task={task}
                onComplete={() => handleCompleteTask(index)}
              />
            ))}
          </VStack>
        </Box>

        <Box mt={8}>
          <Text fontSize="2xl" mb={4}>
            Feito:
          </Text>
          <VStack spacing={4} align="stretch">
            {completedTasks.map((task, index) => (
              <TaskItem key={index} task={task} completed />
            ))}
          </VStack>
        </Box>
      </Box>
    </>
  );
}
