
import { ChangeEvent, useContext, useState } from 'react'
import { SchedulesContext } from "@/context/schedules"
import { UIContext } from '@/context/ui'

import { Button, Box, TextField } from '@mui/material'

import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

export const NewSchedule = () => {

    const { addNewSchedule } = useContext(SchedulesContext)
    const { isAddingSchedule, setIsAddingSchedule } = useContext(UIContext)

    const [inputValue, setInputValue] = useState('')
    const [touched, setTouched] = useState(false)

    const onTextFieldChaged = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
    }

    const onSave = () => {
        if (inputValue.length === 0) return

        addNewSchedule(inputValue)
        setIsAddingSchedule(false)
        setTouched(false)
        setInputValue('')
    }


    return (
        <Box sx={{ marginBottom: 2, paddingX: 2 }}>

            {isAddingSchedule ? (
                <>
                    <TextField
                        fullWidth
                        sx={{ marginTop: 2, marginBottom: 1 }}
                        placeholder='Nuevo Horario'
                        autoFocus
                        label='Nuevo Horario'
                        helperText={inputValue.length <= 0 && touched && 'Ingrese horario'}
                        error={inputValue.length <= 0 && touched}
                        value={inputValue}
                        onChange={onTextFieldChaged}
                        onBlur={() => setTouched(true)}
                    />

                    <Box display='flex' justifyContent='space-between'>
                        <Button
                            variant='text'
                            onClick={() => setIsAddingSchedule(false)}
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant='outlined'
                            color='secondary'
                            endIcon={<SaveOutlinedIcon />}
                            onClick={onSave}
                        >Guardar</Button>
                    </Box>
                </>
            ) : (
                <Button
                    fullWidth
                    color='secondary'
                    startIcon={<AddCircleOutlineOutlinedIcon />}
                    onClick={() => setIsAddingSchedule(true)}
                >Agregar Tarea</Button>

            )}

        </Box>
    )
}
