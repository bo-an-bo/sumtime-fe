import React, { useEffect } from 'react'
import Tables from '../../Components/Tables/Tables'
import styled from 'styled-components'
import { useDeleteMemberIds, useSelectedRows } from '../../store/member'
import AddMemberButton from '../../Components/Buttons/AddMemberButton'
import DeleteMemberButton from '../../Components/Buttons/DeleteMemberButton'

const ShowGroupDetails = () => {
    const { selectedRows } = useSelectedRows()

    const { deleteMemberIds, setDeleteMemberIds } = useDeleteMemberIds()
    const groupId = window.location.href.split('/')[4]

    useEffect(() => {
        const ids = selectedRows.map((row) => row._id)

        setDeleteMemberIds(ids)
    }, [selectedRows, setDeleteMemberIds])
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
    font-family: 'Dotum Light', serif;
    margin-bottom: 2%;
`
export default ShowGroupDetails
