import { ChangeEvent, FC, useContext, useMemo, useState } from 'react'
import { Layout } from '@/components/layouts'
import { SchedulesContext } from '@/context/schedules'
import { Schedule, ScheduleDay } from '@/interfaces'
import { Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, capitalize } from '@mui/material'
import { GetServerSideProps } from 'next'
import { dbSchedules } from '@/database'
import { dateFunctions } from '@/utils'
import SaveOutlined from '@mui/icons-material/SaveOutlined'

const validDays: ScheduleDay[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

interface Props {
    schedule: Schedule
}

const SchedulePage: FC<Props> = ({ schedule }) => {
    const { updateSchedule } = useContext(SchedulesContext)

    const [inputValue, setInputValue] = useState(schedule.description)
    const [day, setDay] = useState<ScheduleDay>(schedule.day)
    const [touched, setTouched] = useState(false)

    const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched])

    const onInputValueChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
    }

    const onDayChanded = (event: ChangeEvent<HTMLInputElement>) => {
        setDay(event.target.value as ScheduleDay)
    }

    const onSave = () => {
        if (inputValue.trim().length === 0) return

        const updatedSchedule: Schedule = {
            ...schedule,
            day,
            description: inputValue
        }

        updateSchedule(updatedSchedule, true)
    }


    return (
        <Layout title={inputValue.substring(0, 10) + '...'}>
            <Grid
                container
                justifyContent='center'
                sx={{ marginTop: 2 }}
            >
                <Grid item xs={12} sm={8} md={6}>
                    <Card>
                        <CardHeader
                            title={`Horario`}
                            subheader={`Creada ${dateFunctions.getFormatDistanceToNow(schedule.createdAt)}`}
                        />
                        <CardContent>
                            <TextField
                                sx={{ marginTop: 2, marginBottom: 1 }}
                                fullWidth
                                placeholder='Nuevo Horario'
                                autoFocus
                                multiline
                                label="Nuevo Horarioo"
                                value={inputValue}
                                onBlur={() => setTouched(true)}
                                onChange={onInputValueChanged}
                                helperText={isNotValid && 'Ingrese un Valor'}
                                error={isNotValid}
                            />

                            <FormControl>
                                <FormLabel>Dia:</FormLabel>
                                <RadioGroup
                                    row
                                    value={day}
                                    onChange={onDayChanded}
                                >
                                    {
                                        validDays.map(option => (
                                            <FormControlLabel
                                                key={option}
                                                value={option}
                                                control={<Radio />}
                                                label={capitalize(option)}
                                            />
                                        ))
                                    }
                                </RadioGroup>
                            </FormControl>
                        </CardContent>

                        <CardActions>
                            <Button
                                startIcon={<SaveOutlined />}
                                variant='contained'
                                fullWidth
                                onClick={onSave}
                                disabled={inputValue.length <= 0}
                            >
                                Save
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </Layout>
    )
}


export const getServerSideProps: GetServerSideProps = async ({ params }) => {

    const { id } = params as { id: string }

    const schedule = await dbSchedules.getScheduleById(id)

    if (!schedule) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {
            schedule
        }
    }
}

export default SchedulePage