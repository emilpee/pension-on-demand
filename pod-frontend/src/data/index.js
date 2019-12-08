import pensionData from './data.json';

export const settingsData = [
    {
        id: 1,
        title: 'Inkomster',
        value: pensionData[0].salary.value,
        procent: pensionData[0].salary.annualInc * 100,
        labelOne: 'Månadslön',
        labelTwo: 'Beräknad årlig löneökning'
    },
    {
        id: 2,
        title: 'Fastigheter',
        labelOne: 'Fastighetsvärdering',
        value: pensionData[0].holdings[0].assets.value,
        procent: pensionData[0].holdings[0].assets.annualInc * 100,
        labelTwo: 'Beräknad årlig värdeökning'
    },
    {
        id: 3,
        title: 'Båt',
        labelOne: 'Sjöfordon',
        value: pensionData[0].holdings[1].assets.value,
        procent: pensionData[0].holdings[1].assets.annualInc * 100,
        labelTwo: 'Beräknad årlig värdeförändring'
    },
    {
        id: 4,
        title: 'Fordon',
        labelOne: 'Bilar och motorcyklar',
        value: pensionData[0].holdings[2].assets.value,
        procent: pensionData[0].holdings[2].assets.annualInc * 100,
        labelTwo: 'Beräknad årlig värdeförändring'
    },
    {
        id: 5,
        title: 'Övrigt',
        labelOne: 'Konst och värdeföremål',
        value: pensionData[0].holdings[3].assets.value,
        procent: pensionData[0].holdings[3].assets.annualInc * 100,
        labelTwo: 'Beräknad årlig värdeförändring'
    }
]


export const doughnutData = {
    labels: ['Skulder', 'Tillgångar'],
    colors: ["#C04D4D", "#0F7354"]
}

export const barData = {
    labels: ['Månadslön', 'Tillgångar', 'Privat pension', 'Tjänstepension', 'Allmän pension'],
    data: [42000, 999, 9999, 9999, 999],
    colors: ["#C04D4D", "#0F7354", "#C04D4D", "#0F7354", "#0F7354"]
}