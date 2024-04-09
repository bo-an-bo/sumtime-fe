import React from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Form, Input, Button, Upload } from 'antd'
import styled from 'styled-components'

// 폼 전송 성공 시 실행되는 함수
const onFinish = async (values) => {
    try {
        const formData = new FormData()
        formData.append('groupname', values.groupname)
        formData.append('groupdescription', values.groupdescription)
        if (values.fileList && values.fileList.length > 0) {
            formData.append('file', values.fileList[0].originFileObj)
        }

        const response = await fetch('서버 URL', {
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
    margin: 20px;
`
// 폼을 감싸는 스타일드 컴포넌트
const StyledFormWrapper = styled.div`
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 10px;
    background-color: #f0f2f5;
    max-width: 400px;
    margin: 10px auto;
`
// 타이틀을 감싸는 스타일드 컴포넌트
const Title = styled.h1`
    margin: 10px auto;
    text-align: center;
`
// 폼 아이템을 감싸는 스타일드 컴포넌트
const StyledFormItems = styled(Form.Item)`
    .ant-btn {
        font-size: 16px;
    }
`
const CreateForm = () => (
    <StyledForm
        name="basic"
        labelCol={{
            span: 6,
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
            <StyledFormItems
                label="모임 이름"
                name="groupname"
                rules={[
                    {
                        required: true,
                        message: '모임 이름을 입력하세요!',
                    },
                ]}
            >
                <Input placeholder="ex) 한사랑산악회, 숭실대 IT대 학생회" />
            </StyledFormItems>
            <StyledFormItems label="모임 설명" name="groupdescription">
                <Input placeholder="ex) 열정 있는 사람들의 모임" />
            </StyledFormItems>
        </StyledFormWrapper>
        <StyledFormWrapper>
            <Title>모임 회원 등록</Title>
            <StyledFormItems label="파일 업로드" valuePropName="fileList" getValueFromEvent={normFile}>
                <Upload action="/upload.do" listType="picture-card" maxCount={1}>
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
