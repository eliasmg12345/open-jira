import { FC, useContext, DragEvent } from 'react'
import { Card, CardActionArea, CardContent, Typography, CardActions } from "@mui/material"
import { Schedule } from '@/interfaces'
import { UIContext } from '@/context/ui'
import { useRouter } from 'next/router'
import { dateFunctions } from '@/utils'

interface Props {
    schedule: Schedule
}

export const ScheduleCard: FC<Props> = ({ schedule }) => {

    const { startDragging, endDragging } = useContext(UIContext)
    const router = useRouter()

    const onDragStart = (event: DragEvent) => {
        event.dataTransfer.setData('text', schedule._id)
        startDragging()
    }

    const onDragEnd = () => {
        endDragging()
    }

    const onClick = () => {
        router.push(`/schedules/${schedule._id}`)
    }

    return (
        <Card
            onClick={onClick}
            sx={{ marginBottom: 1 }}
            draggable
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
        >
            <CardActionArea>
                <CardContent>
                    <Typography sx={{ whiteSpace: 'pre-line' }}>{schedule.description}</Typography>
                </CardContent>

                <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
                    <Typography variant='body2'>{dateFunctions.getFormatDistanceToNow(schedule.createdAt)}</Typography>

                </CardActions>
            </CardActionArea>

        </Card>
    )
}
