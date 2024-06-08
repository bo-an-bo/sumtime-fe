import React, { useState } from 'react'
import { createTransaction } from '../../apis/tranaction'
import { InboxOutlined, LockOutlined } from '@ant-design/icons'
import { Upload, Button, Input, Modal } from 'antd'
import styled from 'styled-components'

const { Dragger } = Upload

const UploadTransaction = ({ groupId }) => {
    const [file, setFile] = useState(null)
    const [password, setPassword] = useState('')
    const [isFileUploaded, setIsFileUploaded] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false)

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

    const handleOk = () => {
        setIsModalVisible(false)
        window.location.reload()
    }

    const handleUpload = async () => {
        await createTransaction(groupId, password, file)
        setIsModalVisible(true)
    }

    return (
        <Wrapper>
            <StyledButton
                onClick={handleUpload}
                type="primary"
                disabled={!isFileUploaded}
                style={{ fontFamily: 'Dotum Light', height: '40px', fontSize: '18px', width: '80px' }}
            >
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
                        <p className="ant-upload-text" style={{ fontFamily: 'Dotum Bold', fontSize: '18px' }}>
                            클릭 또는 파일을 드래그하여 업로드하세요
                        </p>
                        <p className="ant-upload-hint" style={{ fontFamily: 'Dotum Bold', fontSize: '16px' }}>
                            xlsx, csv 파일만 첨부 가능
                        </p>
                    </div>
                )}
            </StyledDragger>
            <StyledPW
                prefix={<LockOutlined />}
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value)
                }}
            />
            <Modal
                title="알림"
                open={isModalVisible}
                onOk={handleOk}
                footer={[
                    <Button key="ok" type="primary" onClick={handleOk}>
                        확인
                    </Button>,
                ]}
            >
                <p>파일이 업로드되었습니다.</p>
            </Modal>
        </Wrapper>
    )
}

export default UploadTransaction

const StyledPW = styled(Input)`
    font-famliy: 'Dotum Bold';
    padding: 10px;
    margin: 10px 0;
    width: 30%;
`
export const StyledButton = styled(Button)`
    margin-top: 20px;
    margin-bottom: 10px;
    width: 90px;
    height: 40px;
    font-size: 18px;
    font-weight: 500;
    font-family: 'Dotum Medium';

    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #003e97;

    &:disabled {
        width: 90px;
        height: 40px;
        font-family: 'Dotum Medium';
    }
`
export const StyledDragger = styled(Dragger)`
    width: 100%;
    height: 100%;
    padding: 10px;
    background-color: rgba(0, 62.67, 151.94, 0.08);
    border-radius: 10px;
    font-family: 'Dotum Bold';
`

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: 100%;
    height: 500px;
`
const FileIconWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`
