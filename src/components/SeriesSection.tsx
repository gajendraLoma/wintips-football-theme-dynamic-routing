"use client";
import { useTranslations } from "next-intl";

const mockSeries = [
  {
    series: "X1",
    time: "05/08 16:45",
    league: "AUS QSL",
    homeTeam: "SC Wanderers FC",
    awayTeam: "ES Brisbane",
    tip: "Over 2.5",
    odds: "0.83",
    awayScore: "2",
    homeScore: "1",
    stake: "$500",
    profit: "H2H",
    status: "WIN",
  },
  {
    series: "X2",
    time: "05/08 21:30",
    league: "POL Cup",
    homeTeam: "Hutnik Krakow",
    awayTeam: "Zaglebie Sosnowiec",
    tip: "Over 2.5",
    odds: "0.85",
    awayScore: "3",
    homeScore: "0",
    stake: "--",
    profit: "+$850",
    status: "WIN",

  },
  {
    series: "X3",
    time: "05/08 23:45",
    league: "ISR LATTC",
    homeTeam: "Ashdod MS",
    awayTeam: "Hapoel Petah Tikva",
    tip: "Under 2.5",
    odds: "0.93",
    awayScore: "0",
    homeScore: "3",
    stake: "+$850",
    profit: "+$850",
    status: "WIN",
  },
   {
    series: "X4",
    time: "05/08 23:45",
    league: "ISR LATTC",
    homeTeam: "Ashdod MS",
    awayTeam: "Hapoel Petah Tikva",
    tip: "Under 2.5",
    odds: "0.93",
    awayScore: "0",
    homeScore: "3",
    stake: "--",
    profit: "+$850",
    status: "WIN",
  },
];

export default function SeriesSection() {
  const t = useTranslations();

  return (
    <div className="space-y-8">
      <section className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  <div className="flex items-center">
                    <label className="flex items-center space-x-2 text-sm text-gray-600">
                      <input type="checkbox" className="sr-only" />
                      <span className="w-9 h-5 bg-white rounded-full relative block">
                        <span className="absolute left-0.5 top-0.5 w-4 h-4 bg-gray-200 rounded-full shadow-sm transform transition-transform"></span>
                      </span>
                    </label>
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  {t("series")}
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  {t("timeLeague")}
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  {t("match")}
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  {t("tipsOdds")}
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  {t("score")}
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  {t("stakeResult")}
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  {t("profit")}
                </th>   
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockSeries.map((series, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center max-[991px]:hidden h-4">
                      <div className="w-[10px] h-[10px] bg-gray-400 rounded-full"></div>
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <div className="w-8 h-8 flex items-center justify-center">
                      <span className="text-sm font-bold text-gray-600">
                        {series.series}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 opacity-70">
                    <div className="text-sm font-medium text-gray-900">
                      {series.time}
                    </div>
                    <div className="text-sm text-gray-500">{series.league}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="w-4 h-4 bg-blue-100 rounded-full"></div>
                      <span className="text-sm font-medium">
                        {series.homeTeam}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-red-100 rounded-full"></div>
                      <span className="text-sm font-medium">
                        {series.awayTeam}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div>
                      <div className="text-sm font-medium text-[#0367cb]">
                        {series.tip}
                      </div>
                      {series.odds && (
                        <div className="text-sm text-gray-500">
                          Odds: {series.odds}
                        </div>
                      )}
                    </div>
                  </td>
                 <td className="px-4 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {series.awayScore}
                      </div>
                   
                        <div className="text-sm text-gray-900">
                         {series.homeScore}
                        </div>
                  
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm font-medium text-gray-900">
                      {series.stake}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                      <span className="text-sm font-medium text-gray-900">
                        {series.profit}
                      </span>
                           <div className="inline-block ml-2 px-2  text-[#ff452f] border-[1px] font-bold uppercase border-solid border-[#ff452f] rounded text-xs">
                          {series.status}
                        </div>
              
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
