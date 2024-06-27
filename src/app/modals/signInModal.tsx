import { useAtom } from "jotai";
import { userIdAtom } from "../atoms/userAtoms";
import { useCallback, useEffect, useState } from "react";
import { Button, Modal, Stack, TextInput } from "@mantine/core";

const SignInModal = () => {
  const [userId, setUserId] = useAtom(userIdAtom);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");

  const isOnlyLetters = (str: string) => {
    return /^[a-zA-Z]+$/.test(str);
  };

  const onFirstNameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.currentTarget.value;
      if (!isOnlyLetters(value)) {
        setError("First name must contain only letters");
      } else {
        setError("");
      }
      setFirstName(event.currentTarget.value);
    },
    []
  );

  const onLastNameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.currentTarget.value;
      if (!isOnlyLetters(value)) {
        setError("Last name must contain only letters");
      } else {
        setError("");
        setLastName(event.currentTarget.value);
      }
    },
    []
  );

  const onSubmit = useCallback(() => {
    if (firstName === "" || lastName === "") {
      setError("First name and last name are required");
    } else {
      setUserId(`${firstName.toLowerCase()}_${lastName.toLowerCase()}`);
    }
  }, [firstName, lastName]);

  const onClose = useCallback(() => {
    setFirstName("");
    setLastName("");
    setUserId("");
  }, []);

  useEffect(() => {
    // clear error after 5 seconds
    if (error) {
      setTimeout(() => setError(""), 5000);
    }
  }, []);

  return (
    <Modal
      size={500}
      radius={"lg"}
      title="Let's get started!"
      opened={userId === ""}
      withCloseButton={false}
      closeOnClickOutside={false}
      closeOnEscape={false}
      onClose={onClose}
      centered
    >
      <Stack spacing={16}>
        <TextInput
          label="First Name"
          placeholder="Enter your first name"
          value={firstName}
          onChange={onFirstNameChange}
          required
        />
        <TextInput
          label="Last Name"
          placeholder="Enter your last name"
          value={lastName}
          onChange={onLastNameChange}
          required
        />
        <Button onClick={onSubmit}>Sign In</Button>
      </Stack>
    </Modal>
  );
};

export default SignInModal;
