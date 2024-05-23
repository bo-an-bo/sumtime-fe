import React, { useState } from 'react'
import { uploadMember } from '../../apis/members'
import { InboxOutlined } from '@ant-design/icons'
import { Upload, Button } from 'antd'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
const { Dragger } = Upload

const UploadMember = ({ groupId }) => {
    const isOpen = useMediaQuery({ maxWidth: 1180 })
    const [file, setFile] = useState(null)
    const [isFileUploaded, setIsFileUploaded] = useState(false)
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

    const handleUpload = async () => {
        await uploadMember(groupId, file)
        alert('파일이 업로드되었습니다.')
        navigate(`/group/${groupId}/showGroupDetails`)
    }

    return (
        <Wrapper isOpen={isOpen}>
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
    margin: 2%;
    height: 500px;
    margin-top: ${(props) => (props.isOpen ? '150px' : '')};
`
const FileIconWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

export default UploadMember
