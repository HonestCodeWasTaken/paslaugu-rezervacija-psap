import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { trpc } from "~/utils/api";

export default function ReservationModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, register, reset } = useForm();

  const onSubmit = (values) => {
    onClose();
    reset();
  };

  return (
    <Center>
      <Button onClick={onOpen}>Create Reservation</Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Reservation</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <FormControl>
                <FormLabel>Date</FormLabel>
                <Input type="date" {...register("date", { required: true })} />
              </FormControl>
              <FormControl>
                <FormLabel>End Date</FormLabel>
                <Input
                  type="date"
                  {...register("reservationEndDate", { required: true })}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input type="text" {...register("description")} />
              </FormControl>
              <FormControl>
                <FormLabel>Time</FormLabel>
                <Input type="time" {...register("time", { required: true })} />
              </FormControl>
              <FormControl>
                <FormLabel>Color Tag</FormLabel>
                <Input type="text" {...register("colorTag")} />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit">
                Save
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Center>
  );
}
