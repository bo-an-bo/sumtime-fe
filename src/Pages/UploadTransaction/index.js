import React from 'react'
import UploadTransaction from '../../Components/Upload/UploadTranaction'
import { useMediaQuery } from 'react-responsive'
import styled from 'styled-components'

const UploadTransactions = () => {
    const isopen = useMediaQuery({ maxWidth: 1180 })
    const groupId = window.location.href.split('/')[4]
    return (
        <StyledLayout isopen={isopen}>
            <UploadTransaction groupId={groupId} />
        </StyledLayout>
    )
}

const StyledLayout = styled.div`
    width: 100%;
    margin-top: ${(props) => (props.isopen ? '150px' : '0')};
    margin-right: 50px;
    margin-left: 50px;
`

export default UploadTransactions
