import { formatDate } from "../../lib/date-helper";
import { TMatch } from "../../types/results";
import Image from "next/image";

interface Props {
    match: TMatch;
}

const MatchScheduleScore = ({match}: Props) => {

    return (
        <li className="flex gap-2 py-2 items-center border-b border-gray-300 last:border-none">
            <div className="w-full">
                <div className="max-w-[50rem] w-full flex flex-col md:flex-row md:items-center">
         
                    <div className="flex w-full md:flex-[0.5] md:w-auto">
                        <div className="flex-1 md:flex-[0.5]">
                            <div className="w-fit mx-auto md:mx-0">
                                <p className="text-sm text-center text-[#656765]">
                                    {formatDate(match.timestamp)}
                                </p>
                            </div>
                        </div>
                        <div className="flex-1 hidden md:flex-[0.3] md:block text-center">-</div>
                    </div>

                    <div className="flex w-full justify-between items-center md:flex-1 md:flex-row">
                        <div className="flex-1">
                            <div className="flex gap-2 items-center justify-end">
                                <span className="text-[11px] sm:text-sm text-right text-[#090916]">{match.home_name}</span>
                                <div className="w-[25px] h-[25px] relative">
                                    <Image src={match.home_logo} alt="home logo" fill />
                                </div>
                            </div>
                        </div>
                        <div className="flex-[0.2] text-center text-[12px] sm:text-sm">
                            {
                                Number(match.status_id) === 8 ? (
                                    <p className="font-semibold">{JSON.parse(match.home_scores)?.[0]} : {JSON.parse(match.away_scores)?.[0]}</p>
                                ) : (
                                    <p className="font-semibold">V<span>s</span></p>
                                )
                            }
                        </div>
                        <div className="flex-1">
                            <div className="flex gap-2 items-center">
                                <div className="w-[25px] h-[25px] relative">
                                    <Image src={match.away_logo} alt="away logo" fill />
                                </div>
                                <span className="text-[11px] sm:text-sm text-[#090916]">{match.away_name}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
}

export default MatchScheduleScore;