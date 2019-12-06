export const labelData = [
    {
        title: 'Tillgångar',
        id: 1,
        data: [
            {
                id: 1,
                name: "Allmän pension",
                data: 1200000, 
                details: [
                    'SEB', 'Swedbank', 'Handelsbanken'
                ]
            },
            {
                id: 2,
                name: "Tjänstepension",
                data: 950000,
                details: [
                    'SEB', 'Swedbank', 'Handelsbanken'
                ]
            },
            {
                id: 3,
                name: "Villa",
                data: 4200000,
                details: [
                    'SEB', 'Swedbank', 'Handelsbanken'
                ]
            },
            {
                id: 4,
                name: "Båt",
                data: 350000,
                details: [
                    'SEB', 'Swedbank', 'Handelsbanken'
                ]
            }
        ]
    },
    {
        title: 'Skulder', 
        id: 2,
        data: [
            {
                id: 1,
                name: "Bottenlån",
                data: 2550000
            },
            {
                id: 2,
                name: "Blancolån",
                data: 255655
            },
            {
                id: 3,
                name: "Billån",
                data: 175000
            }
        ]
    },
]

export const settingsData = [
    {
        id: 1,
        title: 'Inkomster',
        labelOne: 'Månadslön',
        labelTwo: 'Beräknad årlig löneökning'
    },
    {
        id: 2,
        title: 'Fastigheter',
        labelOne: 'Fastighetsvärdering',
        labelTwo: 'Beräknad årlig värdeökning'
    },
    {
        id: 3,
        title: 'Båt',
        labelOne: 'Sjöfordon',
        labelTwo: 'Beräknad årlig värdeförändring'
    },
    {
        id: 4,
        title: 'Fordon',
        labelOne: 'Bilar och motorcyklar',
        labelTwo: 'Beräknad årlig värdeförändring'
    },
    {
        id: 5,
        title: 'Övrigt',
        labelOne: 'Konst och värdeföremål',
        labelTwo: 'Beräknad årlig värdeförändring'
    }
]


export const doughnutData = {
    labels: ['Skulder', 'Tillgångar'],
    data: [999999, 9999999],
    colors: ["#C04D4D", "#0F7354"]
}

export const barData = {
    labels: ['Månadslön', 'Tillgångar', 'Privat pension', 'Tjänstepension', 'Allmän pension'],
    data: [42000, 999, 9999, 9999, 999],
    colors: ["#C04D4D", "#0F7354", "#C04D4D", "#0F7354", "#0F7354"]
}