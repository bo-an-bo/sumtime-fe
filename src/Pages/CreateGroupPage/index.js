import React from 'react'
import CreateForm from '../../Components/Forms/CreateForm'
//import CreateForm from '../../Components/Forms/CreateForm'
import styled from 'styled-components'
const StyledBack = styled.div`
    width: 100%;
`
const CreateGroup = () => {
    return (
        <StyledBack>
            <CreateForm />
        </StyledBack>
    )
}

export default CreateGroup
