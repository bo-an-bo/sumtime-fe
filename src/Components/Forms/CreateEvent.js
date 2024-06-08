import React, { useEffect, useState } from 'react'
import { Button, DatePicker, Form, Input } from 'antd'
import { postEvent } from '../../apis/event'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useEventStore } from '../../store/event'
import SelectMembers from '../Tables/SelectMembers'
import { useDeviceType } from '../../hooks/useMediaQuery'

const CreateEvent = ({ groupId }) => {
    const { setEventId } = useEventStore()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [transactionStartDate, setTransactionStartDate] = useState('')
    const [transactionEndDate, setTransactionEndDate] = useState('')
    const [fee, setFee] = useState(0)
    const [isProcessing, setIsProcessing] = useState(false)
    const [showSelectMembers, setShowSelectMembers] = useState(false)
    const { isMobile } = useDeviceType()

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
            setEventId(data.eventId)
            setShowSelectMembers(true)
        } catch (error) {
            console.log('이벤트 생성에 실패했습니다.', error)
        } finally {
            setIsProcessing(false)
        }
    }

    useEffect(() => {
        if (showSelectMembers) {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth',
            })
        }
    }, [showSelectMembers])

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
                    <Input
                        placeholder="ex) 2024년도 신입생 환영회 회비"
                        onChange={(e) => setName(e.target.value)}
                        disabled={showSelectMembers}
                    />
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
                        disabled={showSelectMembers}
                    />
                </StyledFormItems>
                {!isMobile && (
                    <Wrapper>
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
                                disabled={showSelectMembers}
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
                                disabled={showSelectMembers}
                            />
                        </StyledFormItems>
                    </Wrapper>
                )}
                {isMobile && (
                    <Wrapper>
                        <StyledFormItems
                            label="이벤트 시작"
                            name="dateStart"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your event date!',
                                },
                            ]}
                        >
                            <DatePicker
                                onChange={(date, dateString) => {
                                    setStartDate(dateString)
                                }}
                                style={{ width: '100%' }}
                                disabled={showSelectMembers}
                            />
                        </StyledFormItems>
                        <StyledFormItems
                            label="이벤트 마감"
                            name="dateEnd"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your event date!',
                                },
                            ]}
                        >
                            <DatePicker
                                onChange={(date, dateString) => {
                                    setEndDate(dateString)
                                }}
                                style={{ width: '100%' }}
                                disabled={showSelectMembers}
                            />
                        </StyledFormItems>
                        <StyledFormItems
                            label="회비 납부 시작"
                            name="payDateStart"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your pay date!',
                                },
                            ]}
                        >
                            <DatePicker
                                onChange={(date, dateString) => {
                                    setTransactionStartDate(dateString)
                                }}
                                style={{ width: '100%' }}
                                disabled={showSelectMembers}
                            />
                        </StyledFormItems>
                        <StyledFormItems
                            label="회비 납부 마감"
                            name="payDateEnd"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your pay date!',
                                },
                            ]}
                        >
                            <DatePicker
                                onChange={(date, dateString) => {
                                    setTransactionEndDate(dateString)
                                }}
                                style={{ width: '100%' }}
                                disabled={showSelectMembers}
                            />
                        </StyledFormItems>
                    </Wrapper>
                )}
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
                    <Input
                        placeholder="ex) 10000"
                        type="text"
                        onChange={(e) => setFee(e.target.value)}
                        disabled={showSelectMembers}
                    />
                </StyledFormItems>
            </StyledFormWrapper>
            <StyledButton
                text="다음"
                size="mid"
                htmlType="submit"
                onClick={handleCreateEvent}
                disabled={isAnyFieldEmpty() || showSelectMembers}
            >
                다음
            </StyledButton>
            {showSelectMembers && <SelectMembers />}
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

    .ant-btn {
        justify-content: flex-end;
        margin-top: 20px;
    }
`

const StyledFormWrapper = styled.div`
    padding: 10px;
    border-radius: 10px;
    background-color: rgba(0, 62.67, 151.94, 0.08);
    width: 70%;
    @media (max-width: 1200px) {
        width: 90%;
        padding: 8px;
    }

    @media (max-width: 768px) {
        width: 95%;
        padding: 6px;
    }

    @media (max-width: 480px) {
        width: 93%;
        padding: 4px;
    }
`

const Title = styled.h1`
    margin: 20px 0 10px 20px;
    text-align: left;
    font-size: 28px;
    font-family: 'Dotum Bold', 'serif';
    word-wrap: break-word;
`

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
        font-family: 'Dotum Light';
    }
`

const Wrapper = styled.div`
    width: 100%;
`
const StyledButton = styled(Button)`
    font-family: 'Dotum Light';
    font-size: 18px;
    height: 40px;
    width: 100px;
    background-color: #003e97;
    color: white;
    margin-bottom: 20px;
`
