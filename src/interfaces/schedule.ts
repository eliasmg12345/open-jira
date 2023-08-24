

export interface Schedule {
    _id: string;
    description: string;
    createdAt: number;
    day: ScheduleDay;
}

export type ScheduleDay = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
