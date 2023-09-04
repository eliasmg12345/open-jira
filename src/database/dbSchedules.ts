import { ISchedule, Schedule } from '@/models'
import { isValidObjectId } from 'mongoose'
import { db } from './'

export const getScheduleById = async (id: string): Promise<ISchedule | null> => {
    if (!isValidObjectId(id)) return null

    await db.connect()
    const schedule = await Schedule.findById(id).lean()
    await db.disconnect()

    return JSON.parse(JSON.stringify(schedule))
}
