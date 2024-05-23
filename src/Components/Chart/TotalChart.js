import * as React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import { styled } from '@mui/system'
import PropTypes from 'prop-types'
import { useMediaQuery } from 'react-responsive'
// eslint-disable-next-line
const StyledDiv = styled('div')(({ isOpen, theme }) => ({
    width: '100%',
    marginTop: isOpen ? '150px' : '10px',
    // marginLeft: '30px',
    '& .paid': {
        backgroundColor: '#E5ECF5', // 파란색
        color: '#fff',
        fontFamily: 'Dotum Bold',
    },
    '& .unpaid': {
        backgroundColor: '#FFDDDD', // 빨간색
        color: '#fff',
        fontFamily: 'Dotum Bold',
    },
    '& .noRecord': {
        backgroundColor: '#cccccc', // 회색
        color: '#000',
        fontFamily: 'Dotum Bold',
    },

    '& .MuiDataGrid-cell, & .MuiDataGrid-columnHeader': {
        fontFamily: 'Dotum Bold',
    },
}))

const TotalChart = ({ groupMemberName, eventName, eventTransactions }) => {
    const [rows, setRows] = useState([])
    const [columns, setColumns] = useState([])
    const isOpen = useMediaQuery({ maxWidth: 1180 })

    useEffect(() => {
        if (!eventTransactions) {
            console.error('eventTransaction is undefined or null')
            return
        }

        const rowData = groupMemberName.map((member) => {
            const row = { id: member, memberName: member }
            console.log('row', row)
            eventName.forEach((event, index) => {
                const eventId = Object.keys(eventTransactions)[index]
                const transaction = eventTransactions[eventId]
                let value = 'No Record' // 기본 값

                if (transaction) {
                    const memberTransaction = transaction.find((t) => t.member.name === member)
                    if (memberTransaction) {
                        value = memberTransaction.isPaid ? 'Paid' : 'Unpaid'
                    }
                }
                row[event] = value // 이벤트 이름으로 열을 설정
            })
            return row
        })

        setRows(rowData)

        const eventColumns = eventName
            .map((event) => {
                // 이벤트 이름이 null인 경우 해당 열 생성하지 않음
                if (!event) return null

                return {
                    field: event, // 이벤트 이름으로 필드 설정
                    headerName: event,
                    width: 150,
                    cellClassName: (params) => {
                        if (params.value === 'Paid') return 'paid'
                        if (params.value === 'Unpaid') return 'unpaid'
                        return 'noRecord'
                    },
                }
            })
            .filter((column) => column !== null) // null인 열 제외

        setColumns([{ field: 'memberName', headerName: '회원명', width: 150 }, ...eventColumns])
    }, [groupMemberName, eventName, eventTransactions])

    return (
        <StyledDiv isOpen={isOpen} style={{ height: 600, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} />
        </StyledDiv>
    )
}

TotalChart.propTypes = {
    groupMemberName: PropTypes.array.isRequired,
    eventName: PropTypes.array.isRequired,
    eventTransactions: PropTypes.object.isRequired,
}

export default TotalChart
