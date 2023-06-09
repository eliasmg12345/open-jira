import { FC, DragEvent } from 'react'

import { Entry } from "@/interfaces"
import { Card, CardActionArea, CardContent, Typography, CardActions } from "@mui/material"

interface Props {
    entry: Entry;
}
export const EntryCard: FC<Props> = ({ entry }) => {

    const onDragStart = (event: DragEvent) => {
        console.log(event);
        event.dataTransfer.setData('text', entry._id)
        // todo: modidifaar el estado, para indicar que estoy haciendo drag
    }
    const onDragEnd = () => {
        //todo: cancelar ondrag
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