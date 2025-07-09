import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
} from "@chakra-ui/react";
import { v4 } from "uuid";
import { useState } from "react";

export type Message = {
  id: string;
  text: string;
  transactionIds: string[];
};

export type CreateMessageModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (message: Message) => void;
};
export const CreateMessageModal = ({
  isOpen,
  onClose,
  onCreate,
}: CreateMessageModalProps) => {
  const [text, setText] = useState("");
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <h2>Create a New Message</h2>
        </ModalHeader>
        <ModalBody>
          <VStack>
            <p>Enter the text of the message</p>
            <input onChange={(e) => setText(e.target.value)} value={text} />
            <Button
              onClick={() => {
                onCreate({
                  text: text,
                  id: v4(),
                  transactionIds: [],
                });
                onClose();
              }}
            >
              Create
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
