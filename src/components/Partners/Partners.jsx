import React, { useEffect } from 'react';
import Partner from '../Partner/Partner';
import { Box, Container } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPartners } from '../../features/partner/partnerSlice';
import Tags from '../Tags/Tags';
import Footer from '../Footer/Footer';
const Partners = ({hideFooter, hideButtons, height}) => {
  const dispatch = useDispatch();
  const { partners, isLoading } = useSelector((state) => state.partner);

  useEffect(() => {
    dispatch(getAllPartners());
  }, [dispatch]);

  const Platinum = partners.filter((partner) => partner.tipo_partnership === 'Platinum');
  const Gold = partners.filter((partner) => partner.tipo_partnership === 'Gold');
  const Silver = partners.filter((partner) => partner.tipo_partnership === 'Silver');

  const tags = [
    { label: 'Todas', count: partners.length },
    { label: 'Platinum', count: Platinum.length},
    { label: 'Gold', count: Gold.length },
    { label: 'Silver', count: Silver.length },



];
  return (
    <Box height={height ? height : '100vh'} display='flex' flexDirection='column' marginTop={5} width='100%'>
			<Container flex='1' display='flex' flexDirection='column' overflow='hidden'>
				<Box position='sticky' top='0' zIndex='1' backgroundColor='white'>
					{!hideButtons && <Buttons options={options} />}
				</Box>
				<Box  width='305px' height='27px'alignContent='center'
				>
					<Tags tags={tags} />
				</Box>
				<Box width='100%' flex='1' overflowY='auto' paddingTop='2'>
					{isLoading ? (
						<p>Loading...</p>
					) : (
						<>
							{partners.map((partner) => (
								<Partner key={partner.id} partner={partner} />
							))}
						</>
					)}
				</Box>
				<Footer hideFooter={hideFooter}/>
			</Container>
		</Box>
  );
};

export default Partners;
