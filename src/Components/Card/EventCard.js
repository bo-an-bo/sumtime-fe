import React, { useEffect, useState } from 'react'
import { Button, Collapse, Descriptions, Modal } from 'antd'
import { deleteEvent, getEvent } from '../../apis/event'
import styled from 'styled-components'

const { Panel } = Collapse

const EventCard = ({ groupId }) => {
    const [events, setEvents] = useState([])
    const [deleteEventId, setDeleteEventId] = useState(null)

    useEffect(() => {
        getEvent(groupId).then((data) => {
            setEvents(data.filter((event) => event !== null))
        })
    }, [groupId])

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString()
    }

    const handleDelete = async () => {
        try {
            if (deleteEventId) {
                await deleteEvent(groupId, deleteEventId)
                setEvents(events.filter((event) => event._id !== deleteEventId))
                setDeleteEventId(null)
            }
        } catch (error) {
            console.error('Failed to delete event:', error)
        }
    }

    const confirmDelete = (eventId) => {
        setDeleteEventId(eventId)
    }

    const cancelDelete = () => {
        setDeleteEventId(null)
    }

    const items = events.map((event, i) => {
        const currentEvent = events[i] || {}
        if (currentEvent.label === null) {
            return null
        }

        return (
            <Panel key={i} header={currentEvent.name || ''}>
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
                <ButtonWrapper>
                    <StyledButton type="primary" danger onClick={() => confirmDelete(currentEvent._id)}>
                        삭제
                    </StyledButton>
                </ButtonWrapper>
            </Panel>
        )
    })

    return (
        <>
            <StyledCollapse bordered={false}>{items}</StyledCollapse>
            <Modal
                title="이벤트 삭제 확인"
                open={deleteEventId !== null}
                onOk={handleDelete}
                onCancel={cancelDelete}
                okText="삭제"
                cancelText="취소"
            >
                <p>정말 삭제하시겠습니까?</p>
            </Modal>
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

const StyledDescriptions = styled(Descriptions)`
    .ant-descriptions-item-label {
        width: auto;
        font-family: 'Dotum Bold', serif;
    }

    .ant-descriptions-item-content {
        font-family: 'Dotum Medium', serif;
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
