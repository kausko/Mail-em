import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import { IconButton } from "@chakra-ui/button";
import { useColorMode } from "@chakra-ui/color-mode";
import { HamburgerIcon, LockIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { VStack } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/layout";
import { Flex, Heading, HStack, Spacer } from "@chakra-ui/layout";
import { MenuList } from "@chakra-ui/menu";
import { MenuButton } from "@chakra-ui/menu";
import { Menu } from "@chakra-ui/menu";
import { signOut } from "next-auth/client";
/**
 * @param  {object} param
 * @param  {import("next-auth").Session} param.session
 */
export default function Navbar({ session }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const handleSignOut = () => signOut({ redirect: false })

  return (
    <Flex p={3} align="center">
      <Heading size="lg" fontWeight="medium">
        Mail-em
      </Heading>
      <Spacer />
      <HStack spacing={2}>
        <IconButton
          icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
          onClick={toggleColorMode}
        />
        {
          !!session &&
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<HamburgerIcon/>}
            />
            <MenuList>
              <VStack>
                <Avatar name={session.user?.name} src={session.user?.image} />
                <Text>{session.user?.name}</Text>
                <Text fontSize="xs">{session.user?.email}</Text>
                <Button 
                  size="sm" 
                  leftIcon={<LockIcon/>} 
                  onClick={handleSignOut}
                  variant="ghost"
                >
                  Log out
                </Button>
              </VStack>
            </MenuList>
          </Menu>
        }
      </HStack>
    </Flex>
  )
}