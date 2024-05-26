import {
  Box,
  Flex,
  IconButton,
  Heading,
  Tooltip,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { HamburgerIcon, QuestionIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const handleTooltipToggle = () => {
    setIsTooltipOpen(!isTooltipOpen);
  };

  return (
    <Box as="header" width="100%" padding="4" bg="white" boxShadow="sm">
      <Flex justify="space-between" align="center">
        <IconButton
          icon={<HamburgerIcon />}
          aria-label="Open Menu"
          onClick={onOpen}
          bg="transparent"
          _hover={{ bg: "gray.100" }}
        />
        <Heading as="h1" size="md" color="black">
          DASIT
        </Heading>
        <Tooltip
          label={
            <>
              • Dasit é sua lista de tarefas simples e minimalista para você
              executar tudo que precisa ser feito a curto prazo.
              <br />
              <br />
              • A sua lista fica salva somente no seu navegador seja no celular
              ou no computador, como não tem login cada dispositivo tem seu
              próprio histórico de tarefas.
              <br />
              <br />
              • Cada tarefa que incluida terá um prazo estipulado por você de
              até uma semana
              <br />
              <br />
              • Todas as tarefas feitas depois de uma semana saem do Inicio e
              vão para Historico.
              <br />
              <br />
              • Dentro de historico você pode ver as tarefas passadas concluidas
              com sucesso e também as que passaram do prazo.
              <br />
              <br />• Tarefas que não forem cumpridas no prazo irão para os
              incompletos.
            </>
          }
          aria-label="A tooltip"
          p={4}
          borderRadius="md"
          boxShadow="md"
          isOpen={isTooltipOpen}
        >
          <IconButton
            icon={<QuestionIcon />}
            aria-label="Help"
            bg="transparent"
            _hover={{ bg: "gray.100" }}
            onClick={handleTooltipToggle}
          />
        </Tooltip>
      </Flex>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <Button as={Link} to="/" w="100%" mb="4" onClick={onClose}>
              Início
            </Button>
            <Button as={Link} to="/historico" w="100%" onClick={onClose}>
              Histórico
            </Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Header;
