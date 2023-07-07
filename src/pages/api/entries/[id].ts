import { db } from '@/database';
import { Entry, IEntry } from '@/models';
import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data =
    | { message: string }
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
        case 'GET':
            return getEntry(req, res);

        default:
            res.status(400).json({ message: 'El metodo no existe ' + req.method });

    }

}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id } = req.query;

    await db.connect();
    const entryToUpdate = await Entry.findById(id);

    if (!entryToUpdate) {
        await db.disconnect();
        res.status(400).json({ message: 'No hay entrada con ese ID' + id }!);
    }

    const {
        description = entryToUpdate?.description,
        status = entryToUpdate?.status,
    } = req.body;

    try {
        const updatedEntry = await Entry.findByIdAndUpdate(id, { description, status }, { runValidators: true, new: true });
        await db.disconnect()

        res.status(200).json(updatedEntry!);

    } catch (error: any) {
        await db.disconnect();
        res.status(400).json({ message: error.error.status.message });
    }


}
const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id } = req.query;
    await db.connect();

    const entryIndDB = await Entry.findById(id);
    await db.disconnect();

    if (!entryIndDB) {
        res.status(400).json({ message: 'No hay entrada con el ID' + id });
    }
    res.status(200).json(entryIndDB!);
}

