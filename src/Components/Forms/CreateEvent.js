import React, { useState } from 'react'
import { Form, Input, Button, DatePicker, Radio, Space } from 'antd'
import { postEvent } from '../../apis/event'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const CreateEvent = ({ groupId }) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [fee, setFee] = useState('')
    const [value, setValue] = useState(1)
    const eventInfo = {
        name,
        description,
        startDate,
        endDate,
        fee,
    }

    const handleCreateEvent = async () => {
        await postEvent(groupId, eventInfo)
        window.location.reload()
    }

    const onChange = (e) => {
        setValue(e.target.value)
    }

    return (
        <StyledForm
            name="basic"
            labelCol={{
                span: 3,
            }}
            wrapperCol={{
                span: 16,
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
                    label="이벤트 회비"
                    name="fee"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your fee!',
                        },
                    ]}
                >
                    <Input placeholder="ex) 10000" onChange={(e) => setFee(e.target.value)} />
                </StyledFormItems>
            </StyledFormWrapper>
            <StyledFormWrapper>
                <Title>이벤트 회원 등록</Title>
                <StyledRadio.Group style={{}} onChange={onChange} value={value}>
                    <Space direction="vertical">
                        <StyledRadio value={1}>새로운 파일 업로드</StyledRadio>
                        <StyledRadio value={2}>업로드한 회원 목록에서 선택하기</StyledRadio>
                    </Space>
                </StyledRadio.Group>
            </StyledFormWrapper>
            <StyledFormItems wrapperCol={{}}>
                <StyledButton type="primary" onClick={handleCreateEvent}>
                    완료
                </StyledButton>
            </StyledFormItems>
        </StyledForm>
    )
}

CreateEvent.propTypes = {
    groupId: PropTypes.string.isRequired,
}
export default CreateEvent

const StyledForm = styled(Form)`
    margin: 30px;
`
// 폼을 감싸는 스타일드 컴포넌트
const StyledFormWrapper = styled.div`
    padding: 10px;
    border-radius: 10px;
    background-color: rgba(0, 62.67, 151.94, 0.08);
    max-width: 800px;
    margin: 10px auto;
`

// 타이틀을 감싸는 스타일드 컴포넌트
const Title = styled.h1`
    margin: 10px 40px;
    text-align: left;
    font-size: 32px;
    font-family: 'KoPubWorld Dotum';
    font-weight: 700;
    word-wrap: break-word;
`
// 폼 아이템을 감싸는 스타일드 컴포넌트
const StyledFormItems = styled(Form.Item)`
    .ant-form-item-label {
        text-align: left;
        margin-left: 40px;
        font-size: 24px;
        font-family: 'KoPubWorld Dotum';
        font-weight: 700;
        word-wrap: break-word;
    }
    .ant-input {
        text-align: left;
        font-size: 14px;
        margin-top: 6px;
    }
    .ant-btn {
        height: 50px;
        width: 100px;
        font-size: 24px;
    }
`
const StyledButton = styled(Button)`
    font-family: 'KoPubWorld Dotum';
    font-weight: 700;
`

const StyledRadio = styled(Radio)`
    display: flex;
    justify-content: left;
    margin-right: 400px;
    font-size: 16px;
    font-weight: 600;
    font-family: 'KoPubWorld Dotum';
`
