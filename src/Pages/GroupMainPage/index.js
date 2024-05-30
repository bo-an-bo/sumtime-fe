import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { getGroupDetail } from '../../apis/groups'
import groupbasic from '../../IMG/groupBasic.png'
import { useGroupStore } from '../../store/group'
const GroupMainPage = () => {
    const [groups, setGroups] = useState({})
    const { setGroupId } = useGroupStore()
    const groupId = window.location.href.split('/')[4]

    useEffect(() => {
        getGroupDetail(groupId).then((data) => {
            setGroups(data)
            setGroupId(groupId)
        })
    }, [groupId, setGroupId])

    return (
        <div>
            <StyledGroupName>{groups.name}</StyledGroupName>
            <StyledGroupDesc>{groups.description}</StyledGroupDesc>
            <StyledImg src={groupbasic} alt="groupMainPage" />
        </div>
    )
}

const StyledImg = styled.img`
    width: 100%;
    // height: 300px;
    margin-top: 20px;
    object-fit: cover;
    float: left;
`

const StyledGroupName = styled.div`
    display: flex;
    margin: 20px 0 0 20px;
    font-family: 'Dotum Bold';
    font-size: 36px;
`

const StyledGroupDesc = styled.div`
    font-family: 'Dotum Light';
    font-size: 26px;
    margin: 0 0 0 20px;
`

export default GroupMainPage
