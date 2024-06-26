// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import { getMember } from '../../apis/members'
import { getEvent } from '../../apis/event'
import { getTransactions } from '../../apis/tranaction'
import TotalChart from '../../Components/Chart/TotalChart'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const ShowResult = () => {
    const groupId = window.location.href.split('/')[4]
    const [groupMemberName, setGroupMemberName] = useState([])
    const [groupEvents, setGroupEvents] = useState([])
    const [eventTransactions, setEventTransactions] = useState({})
    const [eventId, setEventId] = useState([])
    const [eventName, setEventName] = useState([])

    useEffect(() => {
        // Check if groupId is valid
        if (!groupId) {
            console.error('Invalid groupId:', groupId)
            return
        }

        // Fetch group members
        getMember(groupId).then((info) => {
            // console.log('members', info)
            const names = info.members.map((data) => data.name)
            // console.log('names: ', names)

            setGroupMemberName(names)
        })
    }, [groupId])

    useEffect(() => {
        // Fetch group events and update state
        getEvent(groupId).then((events) => {
            setGroupEvents(events.filter((event) => event !== null))
        })
    }, [groupId])

    useEffect(() => {
        // Fetch transactions only if groupEvents is not empty
        if (groupEvents.length > 0) {
            const fetchTransactions = async () => {
                try {
                    const transactionsByEvent = {}

                    for (const event of groupEvents) {
                        // console.log('event', event)

                        // Check if _id exists before accessing it
                        if (event && event._id) {
                            const transactions = await getTransactions(groupId, event._id)
                            transactionsByEvent[event._id] = transactions
                        } else {
                            console.error('이벤트 아이디가 없습니다.', event)
                        }
                    }

                    setEventTransactions(transactionsByEvent)
                } catch (error) {
                    console.error('Error fetching transactions:', error)
                }
            }

            fetchTransactions()
        }
    }, [groupId, groupEvents])

    useEffect(() => {
        // Update eventId and eventName states if groupEvents is not empty
        if (groupEvents.length > 0) {
            const ids = groupEvents.map((event) => event && event._id)
            const names = groupEvents.map((event) => event && event.name)
            setEventId(ids)
            setEventName(names)
        }
    }, [groupEvents])

    // console.log('groupname', groupMemberName)

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ width: '100%' }}
        >
            <Wrapper>
                <TotalChart
                    groupMemberName={groupMemberName}
                    eventId={eventId}
                    eventName={eventName}
                    eventTransactions={eventTransactions}
                />
            </Wrapper>
        </motion.div>
    )
}

export default ShowResult

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: 768px) {
        width: 100%;
        height: 100%;
    }
`
