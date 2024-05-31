import React from 'react'
import MemberList from '../../Components/Tables/MemberList'
import styled from 'styled-components'
import { useEffect } from 'react'
import { useSelectedRows, useDeleteMemberIds } from '../../store/member'
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
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ width: '100%', margin: '3%' }}
        >
            <StyledPageLayout>
                <ButtonWrapper>
                    <AddMemberButton groupId={groupId} />
                    <DeleteMemberButton groupId={groupId} memberIds={deleteMemberIds} />
                </ButtonWrapper>
                <MemberList groupId={groupId} />
            </StyledPageLayout>
        </motion.div>
    )
}

const StyledPageLayout = styled.div`
    width: 100%;
    margin: 2%;
    @media (max-width: 768px) {
        margin-top: 30px;
`
const ButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    font-family: 'Dotum Light';
    gap: 10px;
    margin-bottom: 15px;
`
export default ShowGroupDetails
