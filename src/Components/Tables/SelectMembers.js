import React, { useEffect, useState } from 'react'
import { getMember } from '../../apis/members'
import MemberList from './MemberList'
import { postEventMember } from '../../apis/event'
import { useEventStore, useTableMemInfo } from '../../store/event'
import { useNavigate } from 'react-router-dom'
import BasicButton from '../Buttons/BasicButton'
import styled from 'styled-components'

const SelectMembers = () => {
    const [members, setMembers] = useState([])
    const { memName } = useTableMemInfo()
    const { eventId } = useEventStore()
    const groupId = window.location.href.split('/')[4]

    // member data from Tables

    useEffect(() => {
        getMember(groupId).then((data) => {
            setMembers(data)
        })
    }, [groupId, members])
    const navigate = useNavigate()

    const handleMem = async () => {
        await postEventMember(groupId, eventId, memName)
        navigate(`/group/${groupId}/showEventList`)
    }

    return (
        <StyledLayout>
            <MemberList groupId={groupId} />
            <StyledBasicButton text="멤버 선택 완료" onClick={handleMem}></StyledBasicButton>
        </StyledLayout>
    )
}

export default SelectMembers

const StyledLayout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 20px;
    width: 80%;
    @media (max-width: 1200px) {
        width: 90%;
        padding: 8px;
    }

    @media (max-width: 768px) {
        width: 95%;
        padding: 6px;
    }

    @media (max-width: 480px) {
        width: 100%;
        padding: 4px;
    }
`
const StyledBasicButton = styled(BasicButton)`
    margin-top: 20px;
`
