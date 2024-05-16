import React, { useState } from 'react'
import { createTransaction } from '../../apis/tranaction'
import { InboxOutlined, LockOutlined } from '@ant-design/icons'
import { Upload, Button, Input } from 'antd'
import styled from 'styled-components'

const { Dragger } = Upload

const UploadTransaction = ({ groupId }) => {
    const [file, setFile] = useState(null)
    const [password, setPassword] = useState('')
    const [isFileUploaded, setIsFileUploaded] = useState(false)

    const props = {
        name: 'file',
        accept: '.xlsx, .xls, .csv',
        multiple: false,
        showUploadList: false,
        beforeUpload: (file) => {
            setFile(file)
            setIsFileUploaded(true)
            return false
        },
    }

    const handleUpload = async () => {
        await createTransaction(groupId, password, file)
        alert('파일이 업로드되었습니다.')
        window.location.reload()
    }

    return (
        <Wrapper>
            <StyledButton onClick={handleUpload} type="primary" disabled={!isFileUploaded}>
                확인
            </StyledButton>

            <StyledDragger {...props}>
                {file ? (
                    <FileIconWrapper>
                        <img
                            src={process.env.PUBLIC_URL + '/img/excel.png'}
                            style={{ width: '128px', height: '128px' }}
                            alt="file"
                        />
                        <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{file.name}</p>
                    </FileIconWrapper>
                ) : (
                    <div>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined style={{ fontSize: '64px', color: '#1890ff' }} />
                        </p>
                        <p className="ant-upload-text">클릭 또는 파일을 드래그하여 업로드하세요</p>
                        <p className="ant-upload-hint">xlsx, csv 파일만 첨부 가능</p>
                    </div>
                )}
            </StyledDragger>
            <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
        </Wrapper>
    )
}

export default UploadTransaction

export const StyledButton = styled(Button)`
    margin-top: 20px;
    margin-bottom: 10px;
    width: 100px;
    height: 50px;
    font-size: 20px;
    font-weight: 500;

    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #003e97;
`
export const StyledDragger = styled(Dragger)`
    width: 100%;
    height: 100%;
    padding: 10px;
    background-color: rgba(0, 62.67, 151.94, 0.08);
    border-radius: 10px;
`

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: 50%;
    margin-left: 12%;
`
const FileIconWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`