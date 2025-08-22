// apis/services/Standings.ts


export const fetchMatchStandings = async ( page: number = 1, per_page: number = 10) => {
  try {
    const response = await fetch(`https://api.5goall.com/ranking_top_list_league?page=${page}&per_page=${per_page}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      next: { revalidate: 60 }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data; 
  } catch (error) {
    console.log('error: ', error);
    throw error;
  }
};

export const fetchMatchStandingsByLeague = async (leagueId: string) => {
    try {
        const response = await fetch(`https://api.5goall.com/rankByLeague`, {
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




