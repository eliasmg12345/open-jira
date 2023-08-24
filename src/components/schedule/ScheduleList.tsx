import { FC, useContext, useMemo, DragEvent } from 'react'
import { ScheduleDay } from "@/interfaces"
import { SchedulesContext } from '@/context/schedules'
import { UIContext } from '@/context/ui'
import { List, Paper } from "@mui/material"


import styles from './EntryList.module.css'
import { ScheduleCard } from './'


interface Props {
    day: ScheduleDay
}


export const ScheduleList: FC<Props> = ({ day }) => {

    const { schedules, updateSchedule } = useContext(SchedulesContext)
    const { isDragging, endDragging } = useContext(UIContext)

    const schedulesByDays = useMemo(() => schedules.filter(schedule => schedule.day === day), [schedules])

    const allowDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault()
    }

    const onDropSchedule = (event: DragEvent<HTMLDivElement>) => {
        const id = event.dataTransfer.getData('text')

        const schedule = schedules.find(e => e._id === id)!
        schedule.day = day
        updateSchedule(schedule)
        endDragging()
    }

    return (
        <div
            onDrop={onDropSchedule}
            onDragOver={allowDrop}
            className={isDragging ? styles.dragging : ''}
        >
            <Paper sx={{ height: 'calc(100vh-800px)', overflow: 'scroll', backgroundColor: 'transparent', padding: '3px 5px' }}>
                <List sx={{ opacity: isDragging ? 0.2 : 1, transition: 'all .5s' }}>

                    {
                        schedulesByDays.map(schedule => (
                            <ScheduleCard
                                key={schedule._id} schedule={schedule}
                            />
                        ))
                    }
                </List>
            </Paper>
        </div>
    )
}
