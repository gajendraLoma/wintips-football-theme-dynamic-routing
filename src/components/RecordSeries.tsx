"use client";
import { useTranslations } from "next-intl";

const mockSeries = [
  {
    series: "2526 (X1)",
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
    series: "2526 (X2)",
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
    series: "2526 (X3)",
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
    series: "2526 (X4)",
    time: "05/08 23:4",
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

export default function RecordSeriesSection() {
  const t = useTranslations();

  return (
    <div className="space-y-8">
      <section className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
               
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
                  {t("profit")}
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  {t("status")}
                </th>   
                   <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  {t("view")}
                </th> 
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockSeries.map((series, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                

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
                        <div className="text-[#ff452f] w-fit px-2 border-[1px] font-bold uppercase border-solid border-[#ff452f] rounded text-xs">
                          {series.status}
                        </div>
              
                  </td>
                  <td className="px-4 py-4">
                           <div className="inline-block ml-2 px-2 py-1  text-white text-xs rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0367cb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cursor-pointer"><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0">
                      </path><path d="M13.1 17.936a9.28 9.28 0 0 1 -1.1 .064c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6"></path><path d="M19 16l-2 3h4l-2 3">
                        </path></svg>
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
