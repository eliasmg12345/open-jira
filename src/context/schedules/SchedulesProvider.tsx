import { FC, useEffect, useReducer } from 'react'
import { SchedulesContext, schedulesReducer } from './';
import { useSnackbar } from 'notistack';

import { Schedule } from "@/interfaces";
import { schedulesApi } from '@/apis';

interface Props {
    children: React.ReactNode;
}

export interface SchedulesState {
    schedules: Schedule[];
}

const Schedules_INITIAL_STATE: SchedulesState = {
    schedules: []
}

export const SchedulesProvider: FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(schedulesReducer, Schedules_INITIAL_STATE)
    const { enqueueSnackbar } = useSnackbar()

    const addNewSchedule = async (description: string) => {
        const { data } = await schedulesApi.post<Schedule>('/schedules', { description })
        dispatch({ type: '[Schedule] - Add-Schedule', payload: data })
    }

    const updateSchedule = async ({ _id, description, day }: Schedule, showSnackbar = false) => {
        try {
            const { data } = await schedulesApi.put<Schedule>(`/schedules/${_id}`, { description, day })
            dispatch({ type: '[Schedule] - Schedule-Updated', payload: data })

            //mostrar snackBar
            if (showSnackbar) {
                enqueueSnackbar('Horario Actualizado', {
                    variant: 'success',
                    autoHideDuration: 1500,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    }
                })
            }
        } catch (error) {
            console.log(error);

        }
    }

    const refreshSchedules = async () => {
        try {
            const { data } = await schedulesApi.get<Schedule[]>('/schedules');
            dispatch({ type: '[Schedule] - Refresh-Data', payload: data })
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        refreshSchedules()
    }, [])



    return (
        <SchedulesContext.Provider value={{
            ...state,
            addNewSchedule,
            updateSchedule
        }}>
            {children}
        </SchedulesContext.Provider>
    )
}