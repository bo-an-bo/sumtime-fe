import styled from 'styled-components'
import { Divider } from 'antd'

export const Section = styled.div`
    height: 100vh;
    scroll-snap-align: start;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    //padding: 20px;
    box-sizing: border-box;

`
export const MainSection = styled.div`
    height: 100vh;
    scroll-snap-align: start;
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;
    //padding: 20px;
    box-sizing: border-box;
`
export const Image = styled.img`
    height: 60vh;
    align-self: center;
    margin-bottom: 20px;
`
export const VerticalSection = styled.div`
    display: flex;
    flex-direction: row;
    gap: 5px;
`

export const DescriptionSection = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`

export const Text = styled.p`
    color: #003f98;
    font-family: 'Dotum Medium', serif;
    font-size: ${(props) => (props.isopen ? '0.5rem' : '1rem')};
`
export const TitleText = styled.p`
    color: #003f98;
    font-family: 'Dotum Bold', serif;
    font-size: ${(props) => (props.isopen ? '0.8rem' : '1.2rem')};
`
export const StyleNum = styled.span`
    color: white;
    font-family: 'Dotum Bold', serif;
    background-color: #173E92;
    border-radius: 50%;
    display: inline-block;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    margin-right: 10px;
    text-align: center;


`

export const VerticalImage = styled.img`
    height: 33vh;
    margin-bottom: 20px;
    gap: 10px;
`

export const StyledDivider = styled(Divider)`
    border-color: red;

    .ant-divider-inner-text {
        color: white;
        font-family: 'Dotum Bold', serif;
        background-color: #173E92;
        border-radius: 20px;
        padding-top: 5px;
        padding-bottom: 5px;
    }


`