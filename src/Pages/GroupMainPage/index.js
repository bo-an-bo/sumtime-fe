import React, { useEffect } from 'react'
import styled from 'styled-components'
import { getGroups } from '../../apis/groups'

// import styled from 'styled-components'

const GroupMainPage = () => {
    const [groups, setGroups] = React.useState([])
    useEffect(() => {
        getGroups().then((data) => {
            setGroups(data)
        })
    }, [])

    return (
        <div>
            <StyledImg src={process.env.PUBLIC_URL + '/img/main.jpg'} alt="groupMainPage" />
            <div>
                {groups.map((group) => (
                    <div key={group._id}>
                        <h2>{group.name}</h2>
                        <p>모임소개: {group.description}</p>
                    </div>
                ))}
            </div>
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
