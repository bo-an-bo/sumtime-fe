import { useMediaQuery } from 'react-responsive'

export const useDeviceType = () => {
    const isMobile = useMediaQuery({ maxWidth: 768 })
    const isDesktop = useMediaQuery({ minWidth: 1200 })

    return { isMobile, isDesktop }
}
