import React, { useEffect, useState } from 'react';
import Partner from '../Partner/Partner';
import { Box, Button, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPartners } from '../../features/partner/partnerSlice';

const Partners = () => {
  const dispatch = useDispatch();
  const { partners, isLoading } = useSelector((state) => state.partner);
  const [filteredPartners, setFilteredPartners] = useState([]);
  const [selectedTag, setSelectedTag] = useState('Todas');

  useEffect(() => {
    dispatch(getAllPartners());
  }, [dispatch]);

  useEffect(() => {
    setFilteredPartners(partners);
  }, [partners]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const filterPartners = (type) => {
    setSelectedTag(type);
    if (type === 'Todas') {
      setFilteredPartners(partners);
    } else {
      const filtered = partners.filter((partner) => partner.tipo_partnership.toLowerCase() === type.toLowerCase());
      setFilteredPartners(filtered);
    }
  };

  const Platinum = partners.filter((partner) => partner.tipo_partnership === 'Platinum');
  const Gold = partners.filter((partner) => partner.tipo_partnership === 'Gold');
  const Silver = partners.filter((partner) => partner.tipo_partnership === 'Silver');

  const tags = [
    { label: 'Todas', count: partners.length },
    { label: 'Platinum', count: Platinum.length },
    { label: 'Gold', count: Gold.length },
    { label: 'Silver', count: Silver.length },
  ];

  return (
    <Box>
      <Box display="flex" justifyContent="space-evenly" marginBottom="20px">
        {tags.map((tag, index) => (
          <Button
            key={index}
            fontSize="12px"
            minW='80px'
            h="15px"
            alignItems="center"
            paddingY="8px"
            paddingX="12px"
            bg={selectedTag === tag.label ? '#0F8BA0' : 'none'}
            color={selectedTag === tag.label ? 'white' : 'black'}
            border="1px"
            borderColor={selectedTag === tag.label ? '#0F8BA0' : 'black'}
            borderRadius="80px"
            _hover={{ bg: '#0F8BA0', color: 'white', borderColor: '#0F8BA0' }}
            _active={{ bg: '#0F8BA0', color: 'white', borderColor: '#0F8BA0' }}
            onClick={() => filterPartners(tag.label)}
          >
            <Text isTruncated minWidth="70%">{tag.label}</Text>
            {tag.count && <Text ml="5px">{tag.count}</Text>}
          </Button>
        ))}
      </Box>
      <Box overflow='scroll' overflowX='hidden'>
        {filteredPartners.map((partner) => (
          <Partner  key={partner.id} partner={partner} />
        ))}
      </Box>
    </Box>
  );
};

export default Partners;
