import React, { useEffect, useState } from 'react'
import { Button, Collapse, Descriptions, Popconfirm } from 'antd'
import { deleteEvent, getEvent } from '../../apis/event'
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
                        <Descriptions.Item label="이벤트 기간">
                            {formatDate(currentEvent.startDate) || ''} ~ {formatDate(currentEvent.endDate) || ''}
                        </Descriptions.Item>
                        <Descriptions.Item label="입금 기간">
                            {formatDate(currentEvent.transactionStartDate) || ''} ~{' '}
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
            <StyledCollapse bordered={false}>
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
    width: 80%;
    padding: 10px;
    background-color: rgba(0, 62.67, 151.94, 0.08);
    overflow: auto;
    font-family: 'Dotum Bold', serif;
    max-height: 80vh;

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

const StyledPanel = styled(Collapse.Panel)`
    //margin-bottom: 10px;
`

const StyledDescriptions = styled(Descriptions)`
    .ant-descriptions-item-label {
        width: auto;
        font-family: 'Dotum Bold', serif;
    }

    .ant-descriptions-item-content {
        font-family: 'Dotum Medium', serif;
    }
`

const FlexContainer = styled.div`
    gap: 10px;
    align-items: center;
    justify-content: center;

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
    justify-content: center;
    align-items: center;
    margin-top: 10px;
`

export default EventCard
