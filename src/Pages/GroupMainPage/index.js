import React, { useEffect } from 'react'
import styled from 'styled-components'
import { getGroupDetail } from '../../apis/groups'

// import styled from 'styled-components'

const GroupMainPage = () => {
    const [groups, setGroups] = React.useState([])
    const groupId = window.location.href.split('/')[4]
    useEffect(() => {
        getGroupDetail(groupId).then((data) => {
            setGroups(data)
        })
    }, [groupId])
    return (
        <div>
            <StyledImg src={process.env.PUBLIC_URL + '/img/main.jpg'} alt="groupMainPage" />
            <h1>{groups.name}</h1>
            <h2>{groups.description}</h2>
        </div>
    )
}

const StyledImg = styled.img`
    width: 1000px;
    height: 300px;
    margin-top: 50px;
    object-fit: cover;
    float: left;
`

export default GroupMainPage
