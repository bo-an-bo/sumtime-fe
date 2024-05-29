import * as React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { useMediaQuery } from 'react-responsive'

const StyledDiv = styled('div')(({ isopen }) => ({
    width: '100%',
    marginTop: isopen ? '150px' : '10px',
    '& .paid': {
        backgroundColor: '#0057FF',
        color: '#fff',
        fontFamily: 'Dotum Bold',
    },
    '& .unpaid': {
        backgroundColor: '#FF0000',
        color: '#fff',
        fontFamily: 'Dotum Bold',
    },
    '& .noRecord': {
        backgroundColor: '#b9b9b9',
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
    const isopen = useMediaQuery({ maxWidth: 1180 })

    useEffect(() => {
        console.log('groupMemberName:', groupMemberName)
        console.log('eventName:', eventName)
        console.log('eventTransactions:', eventTransactions)
        if (!Array.isArray(groupMemberName) || !Array.isArray(eventName) || typeof eventTransactions !== 'object') {
            console.error('잘못된 형식의 데이터입니다.')
            return
        }

        const rowData = groupMemberName.map((member) => {
            const row = { id: member, memberName: member }
            eventName.forEach((event, index) => {
                const eventId = Object.keys(eventTransactions)[index]
                const transaction = eventTransactions[eventId]
                let value = '기록 없음'

                if (transaction) {
                    const memberTransaction = transaction.find((t) => t.member.name === member)
                    if (memberTransaction) {
                        value = memberTransaction.isPaid ? '지불' : '미지불'
                    }
                }
                row[event] = value
            })
            return row
        })

        setRows(rowData)

        const eventColumns = eventName
            .map((event) => {
                if (!event) return null

                return {
                    field: event,
                    headerName: event,
                    width: 150,
                    cellClassName: (params) => {
                        if (params.value === '지불') return 'paid'
                        if (params.value === '미지불') return 'unpaid'
                        return 'noRecord'
                    },
                }
            })
            .filter((column) => column !== null)

        setColumns([{ field: 'memberName', headerName: '회원명', width: 150 }, ...eventColumns])
    }, [groupMemberName, eventName, eventTransactions])
    // console.log(Array.isArray(groupMemberName)) // true여야 함
    // console.log(Array.isArray(eventName)) // true여야 함
    // console.log(typeof eventTransactions === 'object' && eventTransactions !== null) // true여야 함

    return (
        <StyledDiv isopen={isopen} style={{ height: 600, width: '100%' }}>
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
