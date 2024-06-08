import React, { useEffect } from 'react'
import MemberList from '../../Components/Tables/MemberList'
import styled from 'styled-components'
import { useDeleteMemberIds, useSelectedRows } from '../../store/member'
import AddMemberButton from '../../Components/Buttons/AddMemberButton'
import DeleteMemberButton from '../../Components/Buttons/DeleteMemberButton'
import { motion } from 'framer-motion'

const ShowGroupDetails = () => {
    const { selectedRows } = useSelectedRows()
    const { deleteMemberIds, setDeleteMemberIds } = useDeleteMemberIds()
    const groupId = window.location.href.split('/')[4]

    useEffect(() => {
        const ids = selectedRows.map((row) => row._id)
        setDeleteMemberIds(ids)
    }, [selectedRows, setDeleteMemberIds])

    return (
        <StyledMotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <StyledPageLayout>
                <ButtonWrapper>
                    <AddMemberButton groupId={groupId} />
                    <DeleteMemberButton groupId={groupId} memberIds={deleteMemberIds} />
                </ButtonWrapper>
                <MemberList groupId={groupId} />
            </StyledPageLayout>
        </StyledMotionDiv>
    )
}

const StyledMotionDiv = styled(motion.div)`
    width: 100%;
    margin: 4%;
    @media (max-width: 768px) {
        margin: 0%;
        margin-top: 30px;
    }
`

const StyledPageLayout = styled.div`
    width: 100%;
`

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    font-family: 'Dotum Light';
    gap: 10px;
    margin-bottom: 15px;
    margin-right: 5%;
`

export default ShowGroupDetails
