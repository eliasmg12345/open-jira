// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from '@/database';
import { ISchedule, Schedule } from '@/models';
import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data =
    | { message: string; }
    | ISchedule


export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    const { id } = req.query
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: 'Id no valido' })
    }

    switch (req.method) {
        case 'PUT':
            return updateSchedule(req, res)
        case 'GET':
            return getSchedule(req, res)
        default:
            res.status(400).json({ message: 'No existe el metodo' + req.method })
    }
}

const updateSchedule = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id } = req.query

    await db.connect()
    const scheduleToUpdate = await Schedule.findById(id)

    if (!scheduleToUpdate) {
        await db.disconnect()
        res.status(400).json({ message: 'No hay horario con tal ID' + id })
    }
    const {
        description = scheduleToUpdate?.description,
        day = scheduleToUpdate?.day
    } = req.body

    try {
        const updatedSchedule = await Schedule.findByIdAndUpdate(id, { description, day }, { runValidators: true, new: true })
        await db.disconnect()
        res.status(200).json(updatedSchedule!)
    } catch (error: any) {
        console.log(error);
        await db.disconnect()
        res.status(400).json({ message: error.error.status.message })
    }
}

const getSchedule = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id } = req.query

    await db.connect()
    const scheduleInDB = await Schedule.findById(id)
    await db.disconnect()

    if (!scheduleInDB) {
        res.status(400).json({ message: 'No hay horario con tal ID' + id })
    }
    res.status(200).json(scheduleInDB!)
}
