import styled from 'styled-components'
import { Divider } from 'antd'

export const Section = styled.div`
    height: 100vh;
    scroll-snap-align: start;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    box-sizing: border-box;
    @media (max-width: 768px) {
        height: auto;
        padding: 20px;
        scroll-snap-align: none ;
    }
`

export const MainSection = styled.div`
    height: 100vh;
    scroll-snap-align: start;
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;
    box-sizing: border-box;
    @media (max-width: 768px) {
        height: auto;
        scroll-snap-align: none ;

    }
`

export const Image = styled.img`
    height: 55vh;
    align-self: center;
    margin-bottom: 20px;
    box-shadow: 0 0 3vh rgba(0, 0, 0, 0.3);
    border-radius: 3vh;
    width: fit-content;

    @media (max-width: 768px) {
        height: 30vh;
        border-radius: 1.5vh;
        align-items: center;
        justify-content: center;
    }
`

export const VerticalSection = styled.div`
    display: flex;
    flex-direction: row;
    gap: 5px;
    align-items: stretch;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
`

export const DescriptionSection = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    //justify-content: space-between;
    padding: 10px;
    box-sizing: border-box;
    @media (max-width: 768px) {
        align-items: center;
        justify-content: center;
    }
`

export const Text = styled.p`
    color: #003f98;
    font-family: 'Dotum Medium', serif;
    font-size: ${(props) => (props.isopen ? '0.5rem' : '1rem')};
    @media (max-width: 768px) {
        font-size: ${(props) => (props.isopen ? '0.4rem' : '0.8rem')};
    }
`

export const TitleText = styled.p`
    color: #003f98;
    font-family: 'Dotum Bold', serif;
    font-size: ${(props) => (props.isopen ? '0.8rem' : '1.2rem')};
    @media (max-width: 768px) {
        font-size: ${(props) => (props.isopen ? '0.6rem' : '1rem')};
    }
`

export const StyleNum = styled.span`
    color: white;
    font-family: 'Dotum Bold', serif;
    background-color: #173e92;
    border-radius: 50%;
    display: inline-block;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    margin-right: 10px;
    text-align: center;
    @media (max-width: 768px) {
        width: 20px;
        height: 20px;
        margin-right: 5px;
    }
`

export const VerticalImage = styled.img`
    height: 33vh;
    width: fit-content;
    margin-bottom: 20px;
    gap: 10px;
    box-shadow: 0 0 3vh rgba(0, 0, 0, 0.3);
    border-radius: 3vh;
    @media (max-width: 768px) {
        height: 20vh;
        border-radius: 1.5vh;
    }
`

export const StyledDivider = styled(Divider)`
    .ant-divider-inner-text {
        color: white;
        font-family: 'Dotum Bold', serif;
        background-color: #173e92;
        border-radius: 20px;
        padding-top: 5px;
        padding-bottom: 5px;
    }
`
