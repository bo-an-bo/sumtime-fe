import React, { useEffect, useState } from 'react'
import { Collapse, Descriptions, Button, Popconfirm } from 'antd'
import { getEvent, deleteEvent } from '../../apis/event'
import styled from 'styled-components'

const EventCard = ({ groupId }) => {
    const [events, setEvents] = useState([])

    useEffect(() => {
        getEvent(groupId).then((data) => {
            setEvents(data.filter((event) => event !== null))
        })
    }, [groupId])

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString()
    }

    const handleDelete = async (eventId) => {
        try {
            await deleteEvent(groupId, eventId)
            setEvents(events.filter((event) => event._id !== eventId))
        } catch (error) {
            console.error('Failed to delete event:', error)
        }
    }

    const confirmDelete = (eventId) => {
        handleDelete(eventId)
    }

    const items = events
        .map((event, i) => {
            const currentEvent = events[i] || {}
            if (currentEvent.label === null) {
                return null
            }

            return {
                key: i,
                label: currentEvent.name || '',
                children: (
                    <StyledDescriptions bordered column={{ xs: 1, xl: 2 }}>
                        <Descriptions.Item label="설명">{currentEvent.description || ''}</Descriptions.Item>
                        <Descriptions.Item label="회비">
                            {typeof currentEvent.fee === 'number'
                                ? currentEvent.fee.toLocaleString() + '원'
                                : currentEvent.fee || ''}
                        </Descriptions.Item>
                        <Descriptions.Item label="이벤트 기한">
                            {formatDate(currentEvent.endDate) || ''}
                        </Descriptions.Item>
                        <Descriptions.Item label="결제기한">
                            {formatDate(currentEvent.transactionEndDate) || ''}
                        </Descriptions.Item>
                    </StyledDescriptions>
                ),
                Button: (
                    <Popconfirm
                        title="정말 삭제하시겠습니까?"
                        onConfirm={() => confirmDelete(currentEvent._id)}
                        okText="삭제"
                        cancelText="아니요"
                    >
                        <ButtonWrapper>
                            <StyledButton type="primary" danger>
                                삭제
                            </StyledButton>
                        </ButtonWrapper>
                    </Popconfirm>
                ),
            }
        })
        .filter((item) => item !== null)

    return (
        <>
            <StyledCollapse accordion bordered={false}>
                {items.map((item, index) => (
                    <StyledPanel key={index} header={item.label}>
                        <FlexContainer>
                            {item.children}
                            {item.Button}
                        </FlexContainer>
                    </StyledPanel>
                ))}
            </StyledCollapse>
        </>
    )
}

const StyledCollapse = styled(Collapse)`
    width: 60%;
    padding: 10px;
    background-color: rgba(0, 62.67, 151.94, 0.08);
    overflow: auto;
    max-height: 450px;
    font-family: 'Dotum Bold', serif;

    @media (max-width: 768px) {
        width: 90%;
    }
`

const StyledPanel = styled(Collapse.Panel)`
    margin-bottom: 10px;
`

const StyledDescriptions = styled(Descriptions)`
    .ant-descriptions-item-label {
        width: 100px;
        font-family: 'Dotum Bold', serif;
    }

    .ant-descriptions-item-content {
        font-family: 'Dotum Medium', serif;
    }
`

const FlexContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;

    @media (min-width: 768px) {
        flex-direction: row;
        justify-content: space-between;
    }
`

const StyledButton = styled(Button)`
    width: 100%;
    font-family: 'Dotum Bold', serif;

    @media (min-width: 768px) {
        width: 80px;
    }
`

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 10px;

    @media (min-width: 768px) {
        margin-top: 90px;
    }
`

export default EventCard
