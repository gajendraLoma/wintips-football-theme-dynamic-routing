// apis/services/getSchedule.ts
export const fetchMatchSchedule = async (date: string = '') => {
    try {
        const response = await fetch('https://api.5goall.com/schedules', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            next: { revalidate: 60 },
            body: JSON.stringify({
                date,
                limit: 50,
                offset: 0
            })
        });

        return await response.json();

    } catch (error) {
        console.log('error: ', error);
        throw error;
    }
}



export const fetchMatchScheduleByLeague = async (leagueId: string) => {
    try {
        const response = await fetch(`https://api.5goall.com/schedulesByLeague`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'no-store',
            body: JSON.stringify({
                id: leagueId 
            })
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.log('fetchMatchResultByLeague error:', error);
        throw error;
    }
};




