import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  VStack,
  Text,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box bg="blue.500" px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Toggle Navigation"
          display={{ md: "none" }}
          onClick={onToggle}
        />
        <HStack spacing={8} alignItems="center">
          <Box>
            <Link to="/">Home</Link>
          </Box>
          <HStack as="nav" spacing={4} display={{ base: "none", md: "flex" }}>
            {user && (
              <>
                <Link to="/profile">{user.name}</Link>
                <Text cursor="pointer" onClick={() => dispatch(logout())}>
                  Logout
                </Text>
              </>
            )}
            {!user && (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            )}
            <Link to="/checkout">Checkout</Link> {/* Enlace añadido */}
          </HStack>
        </HStack>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <VStack as="nav" spacing={4}>
            <Link to="/">Home</Link>
            {user && (
              <>
                <Link to="/profile">{user.name}</Link>
                <Text cursor="pointer" onClick={() => dispatch(logout())}>
                  Logout
                </Text>
              </>
            )}
            {!user && (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            )}
            <Link to="/checkout">Checkout</Link> {/* Enlace añadido */}
          </VStack>
        </Box>
      ) : null}
    </Box>
  );
};

export default Header;
