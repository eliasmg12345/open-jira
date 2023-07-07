interface SeedData {
    entries: SeedEntry[];
}

interface SeedEntry {
    description: string;
    status: string;
    createdAt: number;
}


export const seedData: SeedData = {
    entries: [
        {
            description: 'entrada: err lorem kloerm dolor sui elit sunt qui dolor la',
            status: 'pending',
            createdAt: Date.now()
        },
        {
            description: 'progreso: fthfgh lo kloerm dolor sui elit sunt qui dolor la',
            status: 'in-progress',
            createdAt: Date.now() - 100000,
        },
        {
            description: 'terminda: fghglorem kloerm dolor sui elit sunt qui dolor la',
            status: 'finished',
            createdAt: Date.now() - 1000000,
        },

    ]
}