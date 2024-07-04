import { Card, CardBody, Text, Stack, Heading, Divider, Box, Image, Container, Center, Tag } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

export const UserCard = ({ user }) => {
  const fotos = ["https://images.unsplash.com/photo-1581065178047-8ee15951ede6?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","https://plus.unsplash.com/premium_photo-1677368597077-009727e906db?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","https://images.unsplash.com/photo-1543132220-3ec99c6094dc?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1528892952291-009c663ce843?q=80&w=2144&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","https://images.unsplash.com/photo-1529688530647-93a6e1916f5f?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","https://img.freepik.com/foto-gratis/mujer-negocios-feliz-pie-al-aire-libre_1262-20546.jpg?t=st=1720072365~exp=1720075965~hmac=7e2be5b50f1f0a4bd4a468a8d5020aa395deed7d23c31d69ac7035c693d35def&w=740","https://img.freepik.com/foto-gratis/hermoso-retrato-mujer-negocios_23-2149280722.jpg?t=st=1720072386~exp=1720075986~hmac=ca09dbf3cbb0f09d356a14623eb8829d2df56bb0f280c97525a65c6befde3d49&w=740", "https://img.freepik.com/foto-gratis/primer-plano-miembro-sindicato_23-2150969909.jpg?t=st=1720072451~exp=1720076051~hmac=c1a87843c34f8a197c5b666b4cc26d0b4311a30dd5aab94f774aaf5bd109183b&w=740","https://img.freepik.com/foto-gratis/hombre-tiro-medio-posando-interior_23-2151038704.jpg?t=st=1720072457~exp=1720076057~hmac=e6cd41b074003463a7f35ba2b058acfb63e4281b5ab16cc40afc0989dbd13144&w=740","https://img.freepik.com/foto-gratis/empleado-corporativo-posando-oficina_23-2148804484.jpg?t=st=1720072434~exp=1720076034~hmac=9f3a85bd6dfbc47067bcd9f55135cb1eff3c3d6ac7d7884f45b1ae1844f2db4a&w=740","https://img.freepik.com/foto-gratis/retrato-mujer-llevando-traje-formal_23-2148937763.jpg?t=st=1720072424~exp=1720076024~hmac=39f683d05a0d9839fbf6d213fd6b8fd6d35570db730d1669cccb33bf488773aa&w=740"]

  const randomPhoto = fotos[Math.floor(Math.random() * fotos.length)];


  return (
    <>
      <Container maxW="md" spacing={4}> 
      
    
        <Link to={`/userdetail/${user.id}`}>
        
          <Container  paddingX='0' paddingY='16px' display='flex' justifyContent='space-between' alignContent='center' borderTop='#718096 1px solid' >
            <Box display="flex" direction="row" w='343px' key={user.id} height='108px' >
              <Box mr={4}>
                <Image
                  borderRadius='10px'
                  objectFit="cover"
                  width="95px"
                  minW='95px'git 
                  height="108px"
                  src={randomPhoto}
                  alt="Caffe Latte"
                />
              </Box>
              <Box display='flex' justifyContent='center' flexDirection='column'>
                <Heading fontSize="14px">{user?.nombre} {user?.apellido}</Heading>
                <Text fontSize="12px" py="2">{user.puesto_trabajo}</Text>
                <Box className='Tags'>
                <Tag variant='outline' fontSize="12px" py="2" height='20px' borderRadius={12}>{user.nombre_empresa}</Tag>
                </Box>
              </Box>
            </Box>
        
          </Container>
        </Link>
      </Container>
    </>
  );
}

export default UserCard;
