import React, { useEffect } from 'react';
import Partner from '../Partner/Partner';
import { Box } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPartners } from '../../features/partner/partnerSlice';
const Partners = () => {
  const dispatch = useDispatch();
  const { partners, isLoading } = useSelector((state) => state.partner);

  useEffect(() => {
    dispatch(getAllPartners());
  }, [dispatch]);
  if (isLoading) {
    return <p>Loading...</p>;
  }

  // if (error) {
  //   return <p>Error: {error}</p>;
  // }

  return (
    <Box>
      {partners.map((partner) => (
        <Partner key={partner.id} partner={partner} />
      ))}
    </Box>
  );
};

export default Partners;
