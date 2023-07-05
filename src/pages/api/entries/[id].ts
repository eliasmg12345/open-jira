import { db } from '@/database';
import { Entry, IEntry } from '@/models';
import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data =
    | { message: string }
    | IEntry[]
    | IEntry 

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    const { id } = req.query;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: 'El id no es valido' })
    }

    switch (req.method) {
        case 'PUT':
            return updateEntry(req, res);

        default:
            res.status(400).json({ message: 'El metodo no existe' });

    }

}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id } = req.query;

    await db.connect()
    const entryToUpdate = await Entry.findById(id)

    if (!entryToUpdate) {
        await db.disconnect();

    }
    const {
        description = entryToUpdate?.description,
        status = entryToUpdate?.status,
    } = req.body;

    const updatedEntry = await Entry.findByIdAndUpdate(id, { description, status }, { runValidators: true, new: true });

    res.status(200).json(updatedEntry!);

    await db.disconnect()

}


