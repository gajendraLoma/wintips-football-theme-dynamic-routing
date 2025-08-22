export interface ApiResponse<T> {
    total_matches: number;
    result: T;
}

export interface TMatch {
    match_id: string;
    competition_id: string;
    league_name: string;
    home_name: string;
    away_name: string;
    home_logo: string;
    away_logo: string;
    home_scores: string;
    away_scores: string;
    status_id: number;
    timestamp: number;
    league_logo: string;
    home_id: string;
    away_id: string;
    league_country: string;
    mlive: number;
    replay: string;
    streamerID: string | number;
    stats: string;
    live: number;
    incidents: string;
    stage_name: string;
    cur_round: number;
    goals_home: number;
    goals_away: number;
    detail: string;
    score_ht_home: number;
    score_ht_away: number;
}

export interface TLeague {
    league_id: string;
    league_name: string;
    stage_name: string;
    league_round: number | string;
    league_country: string;
    league_logo: string;
    league_slug: string;
    fixtures: TMatch[];
}

export interface TCompetition {
    competition_id: string;
    competition_name: string;
    competition_logo: string;
    type: number;
    round_num: number;
    group_num: number;
    matches: TMatchCompetition[];
}

export interface TMatchCompetition {
    match_id: string;
    stage_name: string;
    home_team_id: string;
    home_name: string;
    home_logo: string;
    away_team_id: string;
    away_name: string;
    away_logo: string;
    match_time: number;
    status_id: number;
    home_scores: number[];
    away_scores: number[];
    streamerID: number;
    live: boolean;
}

export type TPageType = 'SCHEDULE' | 'RESULT' | "ONLINE-SCORE";

export type TLeagueRankingPromotion = {
    id: string;
    name: string;
    color: string;
} 

export interface TStandingTableRow {
    team_id: string;
    promotion_id: string;
    points: number;
    position: number;
    deduct_points: number;
    note: string;
    total: number;
    won: number;
    draw: number;
    loss: number;
    goals: number;
    goals_against: number;
    goal_diff: number;
    home_points: number;
    home_position: number;
    home_total: number;
    home_won: number;
    home_draw: number;
    home_loss: number;
    home_goals: number;
    home_goals_against: number;
    home_goal_diff: number;
    away_points: number;
    away_position: number;
    away_total: number;
    away_won: number;
    away_draw: number;
    away_loss: number;
    away_goals: number;
    away_goals_against: number;
    away_goal_diff: number;
    updated_at: number;
    team_name: string;
    logo: string;
}

export interface TStandingTable {
    id: string;
    conference: string;
    group: number;
    stage_id: string;
    rows: TStandingTableRow[];
}

export interface TLeagueRanking {
    competition_id: string;
    competition_name: string;
    competition_logo: string;
    season_id: string;
    year: string;
    standing: {
        promotions: TLeagueRankingPromotion[];
        tables: TStandingTable[];
    };

}