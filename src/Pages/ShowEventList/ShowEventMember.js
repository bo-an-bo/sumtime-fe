import React from 'react'
import { useState, useEffect } from 'react'
import { getEvent } from '../../apis/event'
import { Button, Table } from 'antd'
import styled from 'styled-components'

// import { useEventMemberStore } from '../../store/member'

const ShowEventMember = ({ groupId, eventMembers }) => {
    // eslint-disable-next-line
    const [events, setEvents] = useState([])
    const [matchingarr, setMatchingarr] = useState([])

    useEffect(() => {
        getEvent(groupId).then((data) => {
            setEvents(data)
        })
    }, [groupId])

    console.log('eventMembers', eventMembers)

    const handleClick = (memIds) => {
        const matchingMembers = eventMembers.filter((member) => memIds.includes(member._id))
        setMatchingarr(matchingMembers)
        console.log('matting', matchingarr)
    }

    const renderButtons = () => {
        return events.map((item) => (
            <StyledEventButton key={item._id} onClick={() => handleClick(item.attendees)}>
                {item.name}
            </StyledEventButton>
        ))
    }
    const columns = [
        {
            title: '순',
            dataIndex: 'index',
        },
        {
            title: '이름',
            dataIndex: 'name',
        },
    ]

    const data = []
    for (let i = 0; i < matchingarr.length; i++) {
        data.push({
            _id: matchingarr[i]._id,
            key: i,
            index: i + 1,
            name: matchingarr[i].name,
        })
    }
    return (
        <StyledShowMember>
            <StyeldButtonSection>{renderButtons()}</StyeldButtonSection>

            {/* {matchingarr.map((item, index) => (
                    <div key={index}></div>
                ))} */}
            <StyledTable columns={columns} dataSource={data} pagination={false} scroll={{ y: 450 }} />
        </StyledShowMember>
    )
}

export default ShowEventMember
const StyledShowMember = styled.div`
    width: 20%;
    display: flex;
    flex-direction: column;
    padding: 10px;
`

const StyeldButtonSection = styled.div`
    display: flex;
    flex-direction: row;
    font-family: 'Dotum Bold';
`
const StyledEventButton = styled(Button)`
    font-family: 'Dotum Bold';
    margin: 4px 3px 10px 10px;
    padding: 5px;
`
const StyledTable = styled(Table)`
    font-family: 'Dotum Light';
    .ant-table-thead > tr > th {
        border-bottom: 2px solid #d9d9d9;
        font-size: 16px;
        text-align: center;
        background-color: rgba(0, 62.67, 151.94, 0.04);
        font-family: 'Dotum Bold', 'serif';
    }

    .ant-table-tbody > tr > td {
        border-bottom: 1px solid #d9d9d9;
        font-size: 15px;
        text-align: center;
        padding: 10px;
        background-color: rgba(0, 62.67, 151.94, 0.04);
        font-family: 'Dotum Medium', 'serif';
        border-bottom: 2px solid #d9d9d9;
    }
`
