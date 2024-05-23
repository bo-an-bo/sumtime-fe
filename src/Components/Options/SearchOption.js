import React, { useEffect, useState } from 'react'
import { DatePicker, Segmented, Button, Form, Row, Col } from 'antd'
import { useEventStore, useDayStore, useSort } from '../../store/event'
import EventTransactionResults from '../Tables/EventTransactionResults'
import styled from 'styled-components'
import moment from 'moment'

const { RangePicker } = DatePicker

const TransactionFilter = () => {
    const [form] = Form.useForm()
    const { setSort } = useSort()
    const { eventId } = useEventStore()
    const { setStartDate, setEndDate } = useDayStore()
    const [selectedEventId, setSelectedEventId] = useState('')
    const [showResult, setShowResult] = useState(false)

    const handleFilter = () => {
        const currentValues = form.getFieldsValue()
        const { dateRange, customDateRange } = currentValues

        let startDate = null
        let endDate = null

        if (dateRange === '1month') {
            startDate = moment().subtract(1, 'months').startOf('day').add(9, 'hours').toISOString()
            endDate = moment().add(9, 'hours').toISOString()
        } else if (dateRange === '3months') {
            startDate = moment().subtract(3, 'months').startOf('day').add(9, 'hours').toISOString()
            endDate = moment().add(9, 'hours').toISOString()
        } else if (dateRange === 'custom' && customDateRange) {
            startDate = customDateRange[0].startOf('day').add(9, 'hours').toISOString()
            endDate = customDateRange[1].add(1, 'days').startOf('day').add(9, 'hours').toISOString()
        }

        setSelectedEventId(eventId)
        setStartDate(startDate)
        setEndDate(endDate)
        setSort(currentValues.sortOrder)
        setShowResult(true)
    }

    useEffect(() => {
        form.setFieldsValue({ dateRange: '1month', sortOrder: 'descend' })
    }, [form])

    return (
        <>
            <Wrapper>
                <StyledForm form={form} layout="vertical">
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item name="dateRange" label="조회기간" initialValue="1month">
                                <Segmented
                                    options={[
                                        { label: '1개월', value: '1month' },
                                        { label: '3개월', value: '3months' },
                                        { label: '직접 설정', value: 'custom' },
                                    ]}
                                    onChange={() => form.validateFields(['dateRange'])} // to trigger validation and re-render
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                shouldUpdate={(prevValues, curValues) => prevValues.dateRange !== curValues.dateRange}
                            >
                                {({ getFieldValue }) =>
                                    getFieldValue('dateRange') === 'custom' ? (
                                        <Form.Item name="customDateRange" label="직접 설정">
                                            <RangePicker style={{ width: '100%' }} />
                                        </Form.Item>
                                    ) : null
                                }
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item name="sortOrder" label="내역 정렬" initialValue="descend">
                                <Segmented
                                    options={[
                                        { label: '최신 순', value: 'descend' },
                                        { label: '과거 순', value: 'ascend' },
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    onClick={handleFilter}
                                    style={{
                                        width: '100%',
                                        fontFamily: 'Dotum Light',
                                        height: '40px',
                                        margin: '10px 0 0 0',
                                    }}
                                >
                                    필터 적용
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </StyledForm>
            </Wrapper>
            {showResult && <EventTransactionResults eventId={selectedEventId} />}
        </>
    )
}

const Wrapper = styled.div`
    margin: 100px 40px;
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 300px;
    background-color: #003f981a;
    border-radius: 10px;
    padding: 20px;
`

const StyledForm = styled(Form)`
    .ant-form-item {
        margin-bottom: 10px;
        font-family: 'Dotum Bold';
    }
`

export default TransactionFilter
