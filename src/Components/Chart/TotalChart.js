import * as React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { useMediaQuery } from 'react-responsive'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import { Button } from 'antd'

const StyledDiv = styled('div')(({ isopen }) => ({
    width: '100%',
    marginTop: isopen ? '150px' : '10px',
    '& .paid': {
        paddingLeft: '10px',
        backgroundColor: '#003F98',
        color: '#fff',
        border: '1px solid #fff',
        borderRadius: '2px',
        fontFamily: 'Dotum Bold',
    },
    '& .unpaid': {
        paddingLeft: '10px',
        backgroundColor: '#FF5B14',
        border: '1px solid #fff',
        color: '#fff',
        fontFamily: 'Dotum Light',
    },
    '& .noRecord': {
        paddingLeft: '10px',
        backgroundColor: '#B4B4B4',
        border: '1px solid #fff',
        color: '#fff',
        fontFamily: 'Dotum Bold',
    },
    '& .MuiDataGrid-cell, & .MuiDataGrid-columnHeader': {
        fontFamily: 'Dotum Medium',
    },
}))

const TotalChart = ({ groupMemberName, eventName, eventTransactions }) => {
    const [rows, setRows] = useState([])
    const [columns, setColumns] = useState([])
    const isopen = useMediaQuery({ maxWidth: 1180 })

    useEffect(() => {
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

    const handleExport = () => {
        // eslint-disable-next-line
        const rowsWithoutId = rows.map(({ id, memberName, ...rest }) => ({ 회원명: memberName, ...rest }))

        const ws = XLSX.utils.json_to_sheet(rowsWithoutId)

        const range = XLSX.utils.decode_range(ws['!ref'])
        for (let R = range.s.r; R <= range.e.r; ++R) {
            for (let C = range.s.c; C <= range.e.c; ++C) {
                const cellAddress = { c: C, r: R }
                const cellRef = XLSX.utils.encode_cell(cellAddress)
                if (ws[cellRef] && ws[cellRef].v === '지불') {
                    ws[cellRef].s = {
                        fill: {
                            fgColor: { rgb: 'FF0000' },
                        },
                    }
                } else if (ws[cellRef] && ws[cellRef].v === '미지불') {
                    ws[cellRef].s = {
                        fill: {
                            fgColor: { rgb: 'B7CDFF' },
                        },
                    }
                }
            }
        }

        for (let C = range.s.c; C <= range.e.c; ++C) {
            const cellAddress = { c: C, r: range.s.r }
            const cellRef = XLSX.utils.encode_cell(cellAddress)
            if (ws[cellRef]) {
                if (!ws[cellRef].s) ws[cellRef].s = {}
                ws[cellRef].s.font = { bold: true }
            }
        }

        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
        const data = new Blob([excelBuffer], { type: 'application/octet-stream' })
        saveAs(data, 'event_transactions.xlsx')
    }

    return (
        <StyledDiv isopen={isopen} style={{ height: 600, width: '100%' }}>
            <StyledButton
                onClick={handleExport}
                style={{ padding: '10px', margin: '10px', height: '50px', width: '130px' }}
            >
                <img
                    src={process.env.PUBLIC_URL + '/img/excel.png'}
                    alt="excelDownload"
                    style={{ width: '18px', paddingRight: '5px' }}
                />
                다운로드
            </StyledButton>
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

const StyledButton = styled(Button)`
    font-family: 'Dotum Medium';
    font-size: 18px;
    width: 100px;
    height: 40px;
    background-color: #003f98;
    color: #fff;
    @media (max-width: 768px) {
        width: 80px;
        height: 30px;
        font-size: 14px;
    }
`
