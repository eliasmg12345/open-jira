import { Schedule } from "@/interfaces";
import { SchedulesState } from "./";

type SchedulesActionType =
    | { type: '[Schedule] - Add-Schedule', payload: Schedule }
    | { type: '[Schedule] - Schedule-Updated', payload: Schedule }
    | { type: '[Schedule] - Refresh-Data', payload: Schedule[] }


export const schedulesReducer = (state: SchedulesState, action: SchedulesActionType): SchedulesState => {

    switch (action.type) {
        case '[Schedule] - Add-Schedule':
            return {
                ...state,
                schedules: [...state.schedules, action.payload]
            }
        case '[Schedule] - Schedule-Updated':
            return {
                ...state,
                schedules: state.schedules.map(schedule => {
                    if (schedule._id === action.payload._id) {
                        schedule.day = action.payload.day;
                        schedule.description = action.payload.description
                    }
                    return schedule
                })
            }
        case '[Schedule] - Refresh-Data':
            return {
                ...state,
                schedules: [...action.payload]
            }

        default:
            return state
    }
}