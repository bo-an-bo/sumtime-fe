// import BasicButton from '../Buttons/BasicButton'
import React, { useEffect, useState } from 'react'
import { Button, DatePicker, Form, Input } from 'antd'
import { postEvent } from '../../apis/event'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useEventStore } from '../../store/event'

const CreateEvent = ({ groupId }) => {
    const { eventId, setEventId } = useEventStore()

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [transactionStartDate, setTransactionStartDate] = useState('')
    const [transactionEndDate, setTransactionEndDate] = useState('')
    const [fee, setFee] = useState(0)
    // const [value, setValue] = useState(1)
    const [isProcessing, setIsProcessing] = useState(false)

    const navigate = useNavigate()
    const eventInfo = {
        name,
        description,
        startDate,
        endDate,
        transactionStartDate,
        transactionEndDate,
        fee,
    }

    const isAnyFieldEmpty = () => {
        return !name || !description || !startDate || !endDate || !transactionStartDate || !transactionEndDate || !fee
    }

    const handleCreateEvent = async () => {
        if (isProcessing) {
            return
        }
        setIsProcessing(true)
        try {
            const data = await postEvent(groupId, eventInfo)
            console.log('이벤트가 생성되었습니다.', data)
            setEventId(data.eventId)
            console.log('eventId:', eventId)
            navigate(`/group/${groupId}/createEvent/selectMembers`)
        } catch (error) {
            console.log('이벤트 생성에 실패했습니다.', error)
        } finally {
            setIsProcessing(false)
        }
    }

    useEffect(() => {
        // if (eventId) {
        //     handleMem(eventId)
        // }
    }, [eventId])

    // const onChange = (e) => {
    //     setValue(e.target.value)
    // }

    return (
        <StyledForm
            name="basic"
            labelCol={{
                span: 5,
            }}
            wrapperCol={{
                span: 18,
            }}
            initialValues={{
                remember: true,
            }}
            autoComplete="off"
        >
            <StyledFormWrapper>
                <Title>이벤트 생성</Title>
                <StyledFormItems
                    label="이벤트 이름"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your event name!',
                        },
                    ]}
                >
                    <Input placeholder="ex) 2024년도 신입생 환영회 회비" onChange={(e) => setName(e.target.value)} />
                </StyledFormItems>
                <StyledFormItems
                    label="이벤트 설명"
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your event description!',
                        },
                    ]}
                >
                    <Input
                        placeholder="ex) 2024년도 신입생 환영회 회비"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </StyledFormItems>
                <StyledFormItems
                    label="이벤트 기한"
                    name="date"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your event date!',
                        },
                    ]}
                >
                    <DatePicker.RangePicker
                        onChange={(date, dateString) => {
                            setStartDate(dateString[0])
                            setEndDate(dateString[1])
                        }}
                        style={{ width: '100%' }}
                    />
                </StyledFormItems>
                <StyledFormItems
                    label="회비 납부 기한"
                    name="payDate"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your pay date!',
                        },
                    ]}
                >
                    <DatePicker.RangePicker
                        onChange={(date, dateString) => {
                            setTransactionStartDate(dateString[0])
                            setTransactionEndDate(dateString[1])
                        }}
                        style={{ width: '100%' }}
                    />
                </StyledFormItems>
                <StyledFormItems
                    label="이벤트 회비"
                    name="fee"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your fee!',
                        },
                    ]}
                >
                    <Input placeholder="ex) 10000" type="text" onChange={(e) => setFee(e.target.value)} />
                </StyledFormItems>
            </StyledFormWrapper>
            <StyledButton
                text="다음"
                size="mid"
                htmlType="submit"
                onClick={handleCreateEvent}
                disabled={isAnyFieldEmpty()}
            >
                다음
            </StyledButton>
        </StyledForm>
    )
}

CreateEvent.propTypes = {
    groupId: PropTypes.string.isRequired,
}
export default CreateEvent

const StyledForm = styled(Form)`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
`
// 폼을 감싸는 스타일드 컴포넌트
const StyledFormWrapper = styled.div`
    width: 60%;
    @media (max-width: 768px) {
        width: 90%;
    }
    padding: 10px;
    margin: 20px;
    border-radius: 10px;
    background-color: rgba(0, 62.67, 151.94, 0.08);
`

// 타이틀을 감싸는 스타일드 컴포넌트
const Title = styled.h1`
    margin: 20px 0 10px 20px;
    text-align: left;
    font-size: 28px;
    font-family: 'Dotum Bold', 'serif';
    word-wrap: break-word;
`
// 폼 아이템을 감싸는 스타일드 컴포넌트
const StyledFormItems = styled(Form.Item)`
    .ant-form-item-label {
        font-size: 24px;
        font-family: 'Dotum Bold', 'serif';
        word-wrap: break-word;
        margin: 0 0 0 10px;
    }

    .ant-input,
    .ant-picker {
        width: 100%;
        font-size: 14px;
        // margin-top: 5px;
        // margin-left: 10px;
        font-family: 'Dotum Light';
    }
`

const StyledButton = styled(Button)`
    justify-content: flex-center;
    font-family: 'Dotum Light';
    font-size: 18px;
    height: 40px;
    width: 100px;
    background-color: #003e97;
    //font-weight: 700;
    color: white;
`
