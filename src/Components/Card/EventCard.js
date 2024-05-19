import React, { useEffect, useState } from 'react'
import { Collapse } from 'antd'
import { getEvent } from '../../apis/event'
import styled from 'styled-components'

const EventCard = ({ groupId }) => {
    const [events, setEvents] = useState([])
    useEffect(() => {
        getEvent(groupId).then((data) => {
            setEvents(data)
        })
    }, [groupId])

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString()
    }

    const items = events
        .map((event, i) => {
            // events[i]가 null이거나 undefined인 경우 빈 객체로 대체하여 오류를 방지합니다.
            const currentEvent = events[i] || {}

            // label이 null인 경우 해당 아이템을 무시하고 다음 아이템을 생성하지 않음
            if (currentEvent.label === null) {
                return null
            }

            // label이 null이 아닌 경우 정상적으로 아이템을 생성함
            return {
                key: i,
                label: currentEvent.name || '', // name이 null이면 빈 문자열로 처리
                children: (
                    <div>
                        <p>
                            <strong>설명</strong>: {currentEvent.description || ''}
                        </p>
                        <p>
                            <strong>요금</strong>:{' '}
                            {typeof currentEvent.fee === 'number'
                                ? currentEvent.fee.toLocaleString() + '원'
                                : currentEvent.fee || ''}
                        </p>

                        <p>
                            <strong>이벤트 기한</strong>: {formatDate(currentEvent.endDate) || ''}
                        </p>
                        <p>
                            <strong>결제 기한</strong>: {formatDate(currentEvent.transactionEndDate) || ''}
                        </p>
                    </div>
                ),
            }
        })
        .filter((item) => item !== null) // null인 아이템 제거

    return <StyledCollapse accordion bordered={false} items={items}></StyledCollapse>
}

const StyledCollapse = styled(Collapse)`
    width: 60%;
    margin-left: 100px;
    margin-top: 50px;
    padding: 10px;
    background-color: rgba(0, 62.67, 151.94, 0.08);
    overflow: auto;
    max-height: 450px;
    font-family: 'Dotum Bold', serif;

`

export default EventCard
