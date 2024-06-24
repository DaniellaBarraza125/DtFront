import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box bg="primary.50" px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Toggle Navigation"
          display={{ md: "none" }}
          onClick={onToggle}
          color="secondary"
        />
        <HStack spacing={8} alignItems="center">
          <Box>
            <Link to="/" style={{ color: 'white' }}>Home</Link>
          </Box>
          <Box>
            <Link to="/schedule" style={{ color: 'white' }}>Schedule</Link>
          </Box>
          <HStack as="nav" spacing={4} display={{ base: "none", md: "flex" }}>
            {user && (
              <>
                <Link to="/profile" style={{ color: 'white' }}>{user.name}</Link>
                <Text cursor="pointer" color="white" onClick={() => dispatch(logout())}>
                  Logout
                </Text>
              </>
            )}
            {!user && (
              <>
                <Link to="/login" style={{ color: 'white' }}>Login</Link>
                <Link to="/register" style={{ color: 'white' }}>Register</Link>
              </>
            )}
          </HStack>
        </HStack>
      </Flex>

      {isOpen && (
        <Box pb={4} display={{ md: "none" }}>
          <VStack as="nav" spacing={4}>
            <Link to="/" style={{ color: 'white' }}>Home</Link>
            {user && (
              <>
                <Link to="/profile" style={{ color: 'white' }}>{user.name}</Link>
                <Text cursor="pointer" color="white" onClick={() => dispatch(logout())}>
                  Logout
                </Text>
              </>
            )}
            {!user && (
              <>
                <Link to="/login" style={{ color: 'white' }}>Login</Link>
                <Link to="/register" style={{ color: 'white' }}>Register</Link>
              </>
            )}
          </VStack>
        </Box>
      )}
    </Box>
  );
};

export default Header;
