import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getMember } from '../../apis/members'
import Tables from '../../Components/Tables/Tables'

const Wrapper = styled.div`
    padding: 10px;
    border-radius: 20px;
    background-color: rgba(0, 62.67, 151.94, 0.04);
    max-width: 680px;
    margin: 10px 60px;
`

const ShowGroupDetails = () => {
    const [members, setMembers] = useState([])
    const groupId = window.location.href.split('/')[4]
    useEffect(() => {
        getMember(groupId).then((data) => {
            setMembers(data)
        })
    }, [groupId])

    return (
        <div>
            <Wrapper>
                <Tables members={members || []} groupId={groupId} />
            </Wrapper>
        </div>
    )
}

export default ShowGroupDetails
