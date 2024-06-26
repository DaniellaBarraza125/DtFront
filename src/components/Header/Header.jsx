import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import {
  Box,
  Flex,
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
    <Box bg="primary.50" px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Toggle Navigation"
          onClick={onToggle}
          color="secondary.white"
          background="none"
          _hover={{ background: 'none' }}
          _active={{ background: 'none' }}
        />
        <Flex flex="1" justifyContent="center">
          <Link to="/">
            <svg
              width="29"
              height="33"
              viewBox="0 0 29 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M28.9737 21.0569C28.5896 15.5133 24.0584 11.0451 18.5001 10.7228C15.739 10.5616 13.1783 11.4063 11.1548 12.9208C10.4395 13.4515 9.60731 13.8266 8.71943 13.8933C6.08361 14.0934 4.57782 11.8093 4.12692 10.9895C4.05456 10.8617 4.14641 10.7033 4.29392 10.7033H17.3756V8.70539C17.3756 7.27711 17.0861 5.85161 16.4404 4.57894C13.9911 -0.253305 8.40212 0.00234053 8.40212 0.00234053C3.30027 0.527524 1.26844 3.57026 0.458488 6.06002C-0.293012 8.38027 -0.117662 10.9284 0.962272 13.118C3.09431 17.4501 7.50589 17.6168 7.50589 17.6168C9.04229 17.7002 10.6121 17.5807 11.5612 17.2639C13.6209 16.5748 16.869 13.3209 20.9661 15.191C25.0604 17.0639 25.1105 20.0899 25.1105 20.0899H6.81006C6.71821 20.6623 6.67089 21.2514 6.67089 21.8517C6.67089 28.0094 11.6698 33 17.8348 33C23.9999 33 29.4247 27.5731 28.9737 21.0569ZM8.88364 3.53691C12.4714 3.73976 13.3314 6.86863 13.3314 6.86863H3.92931C3.92931 6.86863 5.29314 3.33406 8.88364 3.53691ZM17.8376 29.5293C12.7358 29.6794 11.0073 23.8746 11.0073 23.8746H25.2107C25.1105 24.836 22.9367 29.3765 17.8376 29.5293Z"
                fill="white"
              />
            </svg>
          </Link>
        </Flex>
        <Box width="29px" /> 
      </Flex>

      {isOpen && (
        <Box pb={4} display={{ md: "block" }}>
          <VStack as="nav" spacing={4}>
            <Link to="/schedule" style={{ color: 'white' }}>Schedule</Link>
            {user && (
              <>
                <Link to="/profile" style={{ color: 'white' }}>{user.name}</Link>
                <Text cursor="pointer" onClick={() => dispatch(logout())} style={{ color: 'white' }}>
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
            <Link to="/checkout" style={{ color: 'white' }}>Checkout</Link>
          </VStack>
        </Box>
      )}
    </Box>
  );
};

export default Header;
