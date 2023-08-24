import { createContext } from "react";
import { Schedule } from "@/interfaces";

interface ContextProps {
    schedules: Schedule[];

    //methods
    addNewSchedule: (description: string) => void;
    updateSchedule: (schedule: Schedule, showSnackbar?: boolean) => void
}

export const SchedulesContext = createContext({} as ContextProps)