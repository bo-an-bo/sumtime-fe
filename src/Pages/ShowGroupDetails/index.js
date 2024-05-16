import React from 'react'
import Tables from '../../Components/Tables/Tables'
import styled from 'styled-components'
import { useEffect } from 'react'
import { useSelectedRows, useDeleteMemberIds } from '../../store/member'
import AddMemberButton from '../../Components/Buttons/AddMemberButton'
import DeleteMemberButton from '../../Components/Buttons/DeleteMemberButton'

const ShowGroupDetails = () => {
    const { selectedRows } = useSelectedRows()

    const { deleteMemberIds, setDeleteMemberIds } = useDeleteMemberIds()
    const groupId = window.location.href.split('/')[4]

    useEffect(() => {
        const ids = selectedRows.map((row) => row._id)

        setDeleteMemberIds(ids)
    }, [selectedRows])
    return (
        <div>
            <ButtonWrapper>
                <AddMemberButton groupId={groupId} />
                <DeleteMemberButton groupId={groupId} memberIds={deleteMemberIds} />
            </ButtonWrapper>
            v
            <Tables groupId={groupId} />
        </div>
    )
}

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 5px;
    // padding: 10px;
    font-family: 'Dotum Light';
    margin-bottom: 2%;
`
export default ShowGroupDetails
