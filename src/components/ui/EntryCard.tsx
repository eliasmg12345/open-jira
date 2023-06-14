import { FC, DragEvent, useContext } from 'react'
import { Card, CardActionArea, CardContent, Typography, CardActions } from "@mui/material"

import { UIContext } from '@/context/ui';
import { Entry } from "@/interfaces"

interface Props {
    entry: Entry;
}
export const EntryCard: FC<Props> = ({ entry }) => {

    const { startDragging, endDragging } = useContext(UIContext)

    const onDragStart = (event: DragEvent) => {

        event.dataTransfer.setData('text', entry._id)
        // todo: modidifaar el estado, para indicar que estoy haciendo drag
        startDragging();
    }
    const onDragEnd = () => {
        //todo: cancelar ondrag
        endDragging();
    }

    return (
        <Card
            sx={{ marginBottom: 1 }}
            //eventyos de drag
            draggable
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
        >
            <CardActionArea>
                <CardContent>
                    <Typography sx={{ whiteSpace: 'pre-line' }}>{entry.description}</Typography>
                </CardContent>

                <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
                    <Typography variant='body2'> hace 30 minutos </Typography>

                </CardActions>
            </CardActionArea>
        </Card >

    )
}