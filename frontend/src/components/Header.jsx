import {
  Button,
  Flex,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import { AiFillHome } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { Link as RouterLink } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import useLogout from "../hooks/useLogout";
import authScreenAtom from "../atoms/authAtom";
import { BsFillChatQuoteFill } from "react-icons/bs";
import { MdOutlineSettings } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { FaMoon, FaUsers } from "react-icons/fa";
import { useState } from "react";
import SuggestedUsers from "./SuggestedUsers.jsx";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useRecoilValue(userAtom);
  const logout = useLogout();
  const setAuthScreen = useSetRecoilState(authScreenAtom);

  const [isToggled, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle(!isToggled);
  };
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex justifyContent={"space-between"} mt={6} mb="12">
      {user && (
        <Link as={RouterLink} to="/">
          <AiFillHome size={24} />
        </Link>
      )}
      {!user && (
        <Link
          as={RouterLink}
          to={"/auth"}
          onClick={() => setAuthScreen("login")}
        >
          Login
        </Link>
      )}

      {/* <Image
        cursor={"pointer"}
        alt="logo"
        w={10}
        src='/favicon.png'
        onClick={toggleColorMode}
      /> */}

      {user && (
        <Flex alignItems={"center"} gap={4}>
          <Link as={RouterLink} to={`/${user.username}`}>
            <RxAvatar size={24} />
          </Link>

          <Link
            size={24}
            display={{ md: "none", sm: "block" }}
            onClick={handleToggle}
          >
            
            <Button p={0} m={0} overflow={scroll} onClick={onOpen}> <FaUsers size={24} /></Button>

            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader></ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <SuggestedUsers/>
                </ModalBody>

                <ModalFooter>
                  
                  
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Link>

          <Link as={RouterLink} to={`/chat`}>
            <BsFillChatQuoteFill size={20} />
          </Link>
          <Link as={RouterLink} to={`/settings`}>
            <MdOutlineSettings size={20} />
          </Link>

          <Link onClick={toggleColorMode} w={10}>
            {colorMode === "dark" ? <FaMoon /> : <MdOutlineLightMode />}
          </Link>

          <Button size={"xs"} onClick={logout}>
            <FiLogOut size={20} />
          </Button>
        </Flex>
      )}

      {!user && (
        <Link
          as={RouterLink}
          to={"/auth"}
          onClick={() => setAuthScreen("signup")}
        >
          Sign up
        </Link>
      )}
    </Flex>
  );
};

export default Header;
