import React, { useState } from 'react'
import { Form, Input, Button, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { createGroup } from '../../apis/groups'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
// 파일 업로드 시 실행되는 함수
const normFile = (e) => {
    if (Array.isArray(e)) {
        return e
    }
    return e && e.fileList
}

const CreateForm = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [file, setFile] = useState(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const navigate = useNavigate()

    const isAnyFieldEmpty = () => {
        return !name || !description
    }

    const handleCreateGroup = async () => {
        if (isProcessing) {
            return
        }
        setIsProcessing(true)
        try {
            const formData = new FormData()
            formData.append('name', name)
            formData.append('description', description)
            formData.append('memberFile', file)
            await createGroup(formData)
            alert('모임이 생성되었습니다.')
            navigate('/group')
        } catch (error) {
            alert('모임 생성에 실패했습니다.')
        } finally {
            setIsProcessing(false)
        }
    }

    const props = {
        name: 'file',
        accept: '.xlsx, .xls, .csv',
        multiple: false,
        showUploadList: true,
        beforeUpload: (file) => {
            setFile(file)
            return false
        },
    }

    return (
        <StyledLayout>
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
                onFinish={handleCreateGroup}
            >
                <StyledFormWrapper>
                    <Title>모임 기본 정보 등록</Title>
                    <StyledFormItems label="모임 이름" name="groupname">
                        <Input placeholder="ex) 열정 모임" onChange={(e) => setName(e.target.value)} />
                    </StyledFormItems>
                    <StyledFormItems label="모임 설명" name="groupdescription">
                        <Input
                            placeholder="ex) 열정 있는 사람들의 모임"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </StyledFormItems>
                </StyledFormWrapper>
                <StyledFormWrapper>
                    <Title>모임 회원 등록</Title>
                    <StyledFormItems label="파일 업로드" valuePropName="fileList" getValueFromEvent={normFile}>
                        <Upload {...props}>
                            <Button icon={<UploadOutlined />}>파일 업로드</Button>
                        </Upload>
                    </StyledFormItems>
                </StyledFormWrapper>
                <StyledFormItems
                    wrapperCol={{
                        offset: 11,
                        span: 13,
                    }}
                >
                    <StyledButton type="primary" htmlType="submit" disabled={isAnyFieldEmpty()}>
                        완료
                    </StyledButton>
                </StyledFormItems>
            </StyledForm>
        </StyledLayout>
    )
}

export default CreateForm

const StyledLayout = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
`

const StyledButton = styled(Button)`
    width: 100px;
    height: 40px;
    font-family: 'Dotum Light';
    font-size: 18px;
    background-color: #003e97;
`
// 전체 폼을 감싸는 스타일드 컴포넌트
const StyledForm = styled(Form)`
    width: 800px;
    margin-top: 100px;
`
// 폼을 감싸는 스타일드 컴포넌트
const StyledFormWrapper = styled.div`
    padding: 10px;
    border-radius: 10px;
    background-color: rgba(0, 62.67, 151.94, 0.08);
    max-width: 800px;
    margin-bottom: 20px;
`

// 타이틀을 감싸는 스타일드 컴포넌트
const Title = styled.h1`
    margin: 10px 40px;
    text-align: left;
    font-size: 32px;
    font-weight: 700;
    word-wrap: break-word;
    font-family: 'Dotum Bold';
`
// 폼 아이템을 감싸는 스타일드 컴포넌트
const StyledFormItems = styled(Form.Item)`
    .ant-form-item-label {
        text-align: left;
        margin-left: 40px;
        font-size: 24px;
        font-family: 'Dotum Light';
        font-weight: 700;
        word-wrap: break-word;
    }
    .ant-input {
        text-align: left;
        font-size: 14px;
        margin-top: 6px;
    }
    .ant-upload {
        margin-top: 6px;
    }
`
