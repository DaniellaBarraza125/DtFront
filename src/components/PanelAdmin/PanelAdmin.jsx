import React from 'react'
import Users from '../Users/Users'
import Schedule from '../Schedule/Schedule'
import { Box, Container } from '@chakra-ui/react'
import PanelInfo from '../PanelInfo/PanelInfo'

const PanelAdmin = () => {
    return (
        <Box  >
            <Box display='flex' flexDirection='row' justifyContent='center'
            alignContent='flex-start'>
                <PanelInfo/>
            </Box>
            <Box className='componentes'display='flex' flexDirection='row' justifyContent='center'
            alignContent='center'>   
                <Box>         
                    <Users/>
                </Box>
                <Box>
                    <Schedule/>
                </Box>
                <Box>         
                    <Users/>
                </Box>
            </Box>

        </Box>
    )
}

export default PanelAdmin