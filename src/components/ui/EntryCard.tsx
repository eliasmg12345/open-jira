import { FC, DragEvent, useContext } from 'react'
import { useRouter } from 'next/router';

import { Card, CardActionArea, CardContent, Typography, CardActions } from "@mui/material"

import { UIContext } from '@/context/ui';
import { Entry } from "@/interfaces"

import { dateFunctions } from '@/utils';

interface Props {
    entry: Entry;
}
export const EntryCard: FC<Props> = ({ entry }) => {

    const { startDragging, endDragging } = useContext(UIContext)
    const router = useRouter();

    const onDragStart = (event: DragEvent) => {

        event.dataTransfer.setData('text', entry._id)
        // todo: modidifaar el estado, para indicar que estoy haciendo drag
        startDragging();
    }
    const onDragEnd = () => {
        //todo: cancelar ondrag
        endDragging();
    }

    const onClick = () => {
        router.push(`/entries/${entry._id}`)
    }

    return (
        <Card
            onClick={onClick}
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
                    <Typography variant='body2'> {dateFunctions.getFormatDistanceToNow(entry.createdAt)} </Typography>

                </CardActions>
            </CardActionArea>
        </Card >

    )
}