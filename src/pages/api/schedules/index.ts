import { db } from "@/database";
import { ISchedule, Schedule } from "@/models";

import type { NextApiRequest, NextApiResponse } from 'next'

type Data =
    | { message: string }
    | ISchedule[]
    | ISchedule

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    switch (req.method) {
        case 'GET':
            return getSchedules(res)
        case 'POST':
            return postSchedule(req, res)

        default:
            return res.status(400).json({ message: 'End Point No existe' })
    }
}

const getSchedules = async (res: NextApiResponse<Data>) => {
    await db.connect()
    const schedules = await Schedule.find().sort({ createdAt: 'descending' })
    await db.disconnect()

    res.status(200).json(schedules)
}


const postSchedule = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { description = '' } = req.body

    const newSchedule = new Schedule({
        description,
        createdAt: Date.now()
    })

    try {
        await db.connect()
        await newSchedule.save()
        await db.disconnect()
        
        return res.status(201).json(newSchedule);

    } catch (e) {
        await db.disconnect()
        console.log(e);
        return res.status(500).json({ message: 'algo esta mal' })
    }
}