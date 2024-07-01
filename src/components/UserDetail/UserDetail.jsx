import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUsersByid } from '../../features/auth/authSlice';
import { Box, Container, Heading, Text, Flex, Center, Button, Image, Tag } from '@chakra-ui/react';
import { TimeIcon } from '@chakra-ui/icons';
import { MdOutlinePlace } from 'react-icons/md';


const UserDetail = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const {userDetail}  = useSelector((state) => state.auth);

    console.log(userDetail);

    useEffect(() => {
        console.log('id', id);
        if (id) {
            dispatch(getUsersByid(id));
        }
    }, [id, dispatch]);

    return (
        <>
            <Box>
                <Container width='100vw' height='100vh' padding='5'>
                    <Box height='69vh'>
                    <Box mr={4}>
                <Image
                  borderRadius='10px'
                  objectFit="cover"
                  width="343px"
                  height="250px"
                  src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                  alt="Caffe Latte"
                />
              </Box>
                        <Box paddingTop='4' paddingBottom='4' textAlign='justify'>
                            <Heading size='16px'>{userDetail?.nombre} {userDetail?.apellido}</Heading>
                        </Box>
                        <Box paddingTop='1' paddingBottom='4' textAlign='justify'>
                            <Text>{userDetail?.puesto_trabajo}, 
                             
                            </Text>
                            <Text> {userDetail?.nombre_empresa}</Text>
                        </Box>
                        <Box paddingTop='1' paddingBottom='4' textAlign='justify'>
                            <Text>{userDetail?.linkedIn}
                            </Text>
                              <Text>
                               {userDetail?.email}
                            </Text>
                        </Box>
                        <Box paddingTop='1' paddingBottom='4' textAlign='justify'>
                            <Heading>Intereses
                            </Heading>
                              <Tag size='16px' bg='none' boder='1px'>{userDetail?.interes} </Tag>
                        </Box>
                
                        
                    </Box>
 
                </Container>
            </Box>
  
        </>
    );
};

export default UserDetail;
