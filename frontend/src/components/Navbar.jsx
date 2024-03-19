import { Flex, Image } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Flex align="center" justify="center" bgColor={"white"} px={20}>
      <Image
        cursor={"pointer"}
        alt="logo"
        
        src='/softwebmission.png'
      />
    </Flex>
    

  );
};

export default Navbar;
