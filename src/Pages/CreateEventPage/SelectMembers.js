import React, { useState } from 'react'
import { getMember } from '../../apis/members'
// import { useState } from 'react'
import { useEffect } from 'react'
import MemberList from '../../Components/Tables/MemberList'
import { postEventMember } from '../../apis/event'
import { useTableMemInfo, useEventStore } from '../../store/event'
// import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import BasicButton from '../../Components/Buttons/BasicButton'

const SelectMembers = () => {
    const [members, setMembers] = useState([])
    const { memName } = useTableMemInfo()
    const { eventId } = useEventStore()
    const groupId = window.location.href.split('/')[4]

    // member data from Tables

    useEffect(() => {
        getMember(groupId).then((data) => {
            setMembers(data)
            console.log(members)
        })
    }, [groupId, members])
    const navigate = useNavigate()

    useEffect(() => {}, [eventId])

    const handleMem = async () => {
        try {
            await postEventMember(groupId, eventId, memName)
            console.log('멤버 등록완료', memName)
            navigate(`/group/${groupId}/showEventList`)
        } catch (error) {
            console.log('Failed to add members', error)
        }
    }

    return (
        <div>
            {/* <Button onClick={handleMem}>멤버 선택 완료</Button> */}
            <BasicButton text="멤버 선택 완료" onClick={handleMem}></BasicButton>
            <MemberList groupId={groupId} />
        </div>
    )
}

export default SelectMembers
