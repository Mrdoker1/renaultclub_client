import { useState } from "react";
import { Input, InputGroup, InputRightElement, IconButton } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const PasswordInput = ({ placeholder, onChange }: { placeholder: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup size="md">
      <Input
        pr="4.5rem"
        type={show ? "text" : "password"}
        placeholder={placeholder}
        onChange={onChange}
      />
      <InputRightElement width="3rem">
        <IconButton
          aria-label={show ? "Hide password" : "Show password"}
          icon={show ? <ViewOffIcon /> : <ViewIcon />}
          onClick={handleClick}
          variant="ghost"
          size="sm"
          h="1.75rem"
          color="gray.500"
        />
      </InputRightElement>
    </InputGroup>
  );
};

export default PasswordInput;
