import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
} from "@chakra-ui/react";

export default function ChallengeModal({ isOpen, onClose, title, prompt, onSubmit }) {
  const [code, setCode] = useState("");
  const handleClose = () => {
    setCode("");
    onClose();
  };
  const handleRun = () => onSubmit && onSubmit(code);
  return (
    <Modal isOpen={isOpen} onClose={handleClose} size='xl'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title || "Sfida"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb='3' color='gray.500'>
            {prompt || "Inserisci il comando Bash richiesto."}
          </Text>
          <Textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder='$ echo "Hello World"'
            rows={8}
          />
        </ModalBody>
        <ModalFooter>
          <Button variant='ghost' mr={3} onClick={handleClose}>
            Chiudi
          </Button>
          <Button colorScheme='brand' onClick={handleRun}>Verifica</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
