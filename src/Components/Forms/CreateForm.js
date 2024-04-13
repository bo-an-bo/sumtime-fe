import React from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Form, Input, Button, Upload } from 'antd'
import styled from 'styled-components'

// 폼 전송 성공 시 실행되는 함수
/* Create 구현 필요 */
const onFinish = async (values) => {
    try {
        const formData = new FormData()
        formData.append('groupname', values.groupname)
        formData.append('groupdescription', values.groupdescription)
        if (values.fileList && values.fileList.length > 0) {
            formData.append('file', values.fileList[0].originFileObj)
        }

        const response = await fetch('http://localhost:3001/groups', {
            method: 'POST',
            body: formData,
        })

        if (!response.ok) {
            throw new Error('서버 응답이 실패하였습니다.')
        }

        console.log('폼 데이터 전송 성공:', values.groupname)
    } catch (error) {
        console.error('폼 데이터 전송 실패:', error)
    }
}

// 폼 전송 실패 시 실행되는 함수
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
}

// 파일 업로드 시 실행되는 함수
const normFile = (e) => {
    console.log('Upload event:', e)
    if (Array.isArray(e)) {
        return e
    }
    return e && e.fileList
}

// 전체 폼을 감싸는 스타일드 컴포넌트
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
const CreateForm = () => (
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
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
    >
        <StyledFormWrapper>
            <Title>모임 기본 정보 등록</Title>
            <StyledFormItems label="모임 이름" name="groupname">
                <Input placeholder="ex) 한사랑산악회, 숭실대 IT대 학생회" />
            </StyledFormItems>
            <StyledFormItems label="모임 설명" name="groupdescription">
                <Input placeholder="ex) 열정 있는 사람들의 모임" />
            </StyledFormItems>
        </StyledFormWrapper>
        <StyledFormWrapper>
            <Title>모임 회원 등록</Title>
            <StyledFormItems label="파일 업로드" valuePropName="fileList" getValueFromEvent={normFile}>
                <Upload action="/upload.do" accept=".csv, .xlsx" listType="picture-card" maxCount={1}>
                    <button
                        style={{
                            border: 0,
                            background: 'none',
                        }}
                        type="button"
                    >
                        <PlusOutlined />
                        <div
                            style={{
                                marginTop: 8,
                            }}
                        >
                            업로드하기
                        </div>
                    </button>
                </Upload>
            </StyledFormItems>
        </StyledFormWrapper>
        <StyledFormItems wrapperCol={{}}>
            <Button type="primary" htmlType="submit">
                완료
            </Button>
        </StyledFormItems>
    </StyledForm>
)
export default CreateForm
