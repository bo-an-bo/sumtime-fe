import React, { useState } from 'react'
import { uploadMember } from '../../apis/members'
import { InboxOutlined } from '@ant-design/icons'
import { Upload, Button, Modal } from 'antd'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const { Dragger } = Upload

const UploadMember = ({ groupId }) => {
    const [file, setFile] = useState(null)
    const [isFileUploaded, setIsFileUploaded] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const navigate = useNavigate()

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
        navigate(`/group/${groupId}/showGroupDetails`)
    }

    const handleUpload = async () => {
        await uploadMember(groupId, file)
        setIsModalVisible(true)
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
                            style={{ width: '40px', height: '40px', padding: '10px' }}
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

export default UploadMember
