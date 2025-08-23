
interface TLeague {
  league_id: string;
  league_name: string;
  stage_name: string;
  league_round: number | string;
  league_country: string;
  league_logo: string;
  league_slug: string;
  name: string;
  logo: string;
  fixtures?: any[];
}

interface TLeagueRankingPromotion {
  id: string;
  name: string;
  color: string;
}

interface TStandingTableRow {
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

interface TStandingTable {
  id: string;
  conference: string;
  group: number;
  stage_id: string;
  rows: TStandingTableRow[];
}

interface TLeagueRanking {
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

interface TLeagueRankingResponse {
  result?: TLeagueRanking[];
}