import { Button } from 'antd'
import styled from 'styled-components'

const StyledBasicButton = styled(Button)`
    min-width: ${({ size }) => (size === 'large' ? '100px' : '80px')};
    height: ${({ size }) => (size === 'large' ? '50px' : '40px')};
    font-size" ${({ size }) => (size === 'large' ? '24px' : '18px')}; 

    font-family: 'Dotum Light';
    // border-radius: 5px;
    background-color: #003e97;
    color: white;

    &:disabled {
        background-color: #b5b5b5;
        color: red;
    }
`
const BasicButton = ({ size, text, onClick }) => {
    return (
        <>
            <StyledBasicButton size={size} onClick={onClick}>
                {text}
            </StyledBasicButton>
        </>
    )
}

export default BasicButton

// const DisabledButton = styled(Button)`
// `
