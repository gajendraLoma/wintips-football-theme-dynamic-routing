export const generateDates = () => {
    const today = new Date();
    const range = [];

    for (let i = -2; i <= 3; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        const day = date.getDate();

        range.push({
            label: i === 0 ? 'TODAY' : '',
            value: date.toISOString().split('T')[0], // YYYY-MM-DD
            day: day < 10 ? `0${day}` : day,
        });
    }
    return range;
}

export const formatDate = (timeStamp: number) => {
    const date = new Date(timeStamp * 1000);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    // const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}-${month} - ${hours}:${minutes}`;
}

export const calcucateTime = (statusId: number, matchTimestamp: number) => {

    const matchTime = new Date(matchTimestamp * 1000); // Convert to milliseconds
    const now = new Date();
    const timeDiffInMinutes = (now.getTime() - matchTime.getTime()) / 60000; // then convert to minutes

    switch (statusId) {
        case 1: return 'Not Started';
        case 2: {
            if (matchTimestamp === 0) return 'HT';

            const firstHaftMinutes = Math.floor(timeDiffInMinutes);
            return firstHaftMinutes > 45 ?
                `45<span class="time">'</span> + ${Number(firstHaftMinutes) - 45}<span class="time">'</span>`
                : `${firstHaftMinutes}<span class="time">'</span>`;
        }
        case 3: return "HT";
        case 4: {
            if (matchTimestamp === 0) return 'HT';

            const secondHaftMinutes = Math.floor(timeDiffInMinutes) + 45;
            return secondHaftMinutes > 90 ?
                `90<span class="time">'</span> + ${Number(secondHaftMinutes) - 90}<span class="time">'</span>`
                : `${secondHaftMinutes}<span class="time">'</span>`;
        }
        case 5: return 'ET';
        case 6: return 'OTD';
        case 7: return 'PEN';
        case 8: return 'FT';
        default: return '';
    }
}