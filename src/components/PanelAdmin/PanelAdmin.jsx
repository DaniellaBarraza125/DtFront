import React from 'react'
import Users from '../Users/Users'
import Schedule from '../Schedule/Schedule'
import { Box } from '@chakra-ui/react'
import PanelInfo from '../PanelInfo/PanelInfo'

const PanelAdmin = () => {
    return (
        <Box height="100vh" display="flex" flexDirection="column">
            <Box display='flex' flexDirection='row' justifyContent='center' alignContent='flex-start'>
                <PanelInfo/>
            </Box>
            <Box flex="1" display='flex' flexDirection='row' justifyContent='center' alignContent='center' overflow="hidden">   
                <Box flex="1" overflow="auto" display="flex" flexDirection="column" alignItems="center">         
                    <Users/>
                </Box>
                <Box flex="1" overflow="auto" display="flex" flexDirection="column" alignItems="center">         
                    <Users/>
                </Box>
                <Box flex="1" overflow="auto" display="flex" flexDirection="column" alignItems="center">
                    <Schedule/>
                </Box>
            </Box>
        </Box>
    )
}

export default PanelAdmin
