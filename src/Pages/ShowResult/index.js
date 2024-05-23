// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import { getMember } from '../../apis/members'
import { getEvent } from '../../apis/event'
import { getTransactions } from '../../apis/tranaction'
import TotalChart from '../../Components/Chart/TotalChart'

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
        getMember(groupId).then((members) => {
            const names = members.map((member) => member.name)
            setGroupMemberName(names)
        })
    }, [groupId])

    useEffect(() => {
        // Fetch group events and update state
        getEvent(groupId)
            .then((events) => {
                // Check if events is null
                if (events === null) {
                    console.error('Group events is null')
                    return
                }
                setGroupEvents(events)
            })
            .catch((error) => {
                console.error('Error fetching group events:', error)
            })
    }, [groupId])

    useEffect(() => {
        // Fetch transactions only if groupEvents is not empty
        if (groupEvents.length > 0) {
            const fetchTransactions = async () => {
                try {
                    const transactionsByEvent = {}

                    for (const event of groupEvents) {
                        console.log('event', event)

                        // Check if _id exists before accessing it
                        if (event && event._id) {
                            const transactions = await getTransactions(groupId, event._id)
                            transactionsByEvent[event._id] = transactions
                        } else {
                            console.error('Event id is empty:', event)
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

    return (
        <div>
            <TotalChart
                groupMemberName={groupMemberName}
                eventId={eventId}
                eventName={eventName}
                eventTransactions={eventTransactions}
            />
        </div>
    )
}

export default ShowResult
