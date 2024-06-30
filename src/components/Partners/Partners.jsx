import React, { useEffect } from 'react';
import Partner from '../Partner/Partner';
import { Box } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPartners } from '../../features/partner/partnerSlice';
import Tags from '../Tags/Tags';
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
  const Platinum = partners.filter((partner) => partner.tipo_partnership === 'Platinum');
  const Gold = partners.filter((partner) => partner.tipo_partnership === 'Gold');
  const Silver = partners.filter((partner) => partner.tipo_partnership === 'Silver');

  const tags = [
    { label: 'Todas', count: 10 },
    { label: 'platinum', count: Platinum.length},
    { label: 'Gold', count: Gold.length },
    { label: 'Silver', count: Silver.length },



];
  return (
      <Box>
        <Box>
          <Tags tags={tags} />
        </Box>
        <Box>
          {partners.map((partner) => (
            <Partner key={partner.id} partner={partner} />
          ))}
        </Box>
      </Box>
  );
};

export default Partners;
