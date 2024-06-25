import { Card, CardBody,Box,Text, Stack, Flex } from '@chakra-ui/react'
import React from 'react'

const PanelInfo = () => {
  return (
    <Box margin='10'>
      <Flex justifyContent='space-between'> 
      <Card width='25%'>
        <CardBody>
        <Text>View a summary of all your customers over the last month.</Text>
        </CardBody>
        </Card>
        <Card width='25%'>
        <CardBody>
          <Text>View a summary of all your customers over the last month.</Text>
        </CardBody>
      </Card>
      <Card width='25%'>
        <CardBody>
          <Text>View a summary of all your customers over the last month.</Text>
        </CardBody>
      </Card>
      </Flex>
    </Box>
  )
}

export default PanelInfo