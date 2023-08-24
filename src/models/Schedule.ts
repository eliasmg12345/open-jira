import { Schedule } from "@/interfaces";
import mongoose, { Model, Schema } from "mongoose";

export interface ISchedule extends Schedule {

}

const scheduleSchema = new Schema({
    description: { type: String, require: true },
    createdAt: { type: Number },
    day: {
        type: String,
        enum: {
            values: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
            message: '{VALUE} no es un estado permitido'
        },
        default: 'monday',
    }
});


const ScheduleModel: Model<ISchedule> = mongoose.models.Schedule || mongoose.model('Schedule', scheduleSchema);


export default ScheduleModel;