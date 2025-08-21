import { Star } from "lucide-react";
 
interface BookmakerCardProps {
  rank: number;
  name: string;
  rating: number;
  bonus: string;
  bonusDescription: string;
  backgroundColor?: string;
}
 
const BookmakerCard = ({
  rank,
  name,
  rating,
  bonus,
  bonusDescription,
  backgroundColor = "bg-white"
}: BookmakerCardProps) => {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
   
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-3 h-3 fill-star-yellow text-star-yellow" />
      );
    }
   
    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="w-3 h-3 fill-star-yellow/50 text-star-yellow" />
      );
    }
   
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-3 h-3 text-gray-300" />
      );
    }
   
    return stars;
  };
 
  return (
    <div className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
      {/* Desktop Layout */}
      <div className="hidden md:flex items-center">
        {/* Rank */}
        <div className="flex-shrink-0 w-12">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium text-sm">
            {rank}
          </div>
        </div>
 
        {/* Bookmaker Info */}
        <div className="flex-shrink-0 w-80 flex items-center space-x-3">
          <div className={`w-16 h-10 rounded flex items-center justify-center ${backgroundColor}`}>
            <div className="text-white font-bold text-xs">{name}</div>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{name}</h3>
            <div className="flex items-center space-x-1 mt-1">
              {renderStars(rating)}
            </div>
          </div>
        </div>
 
        {/* Bonus */}
        <div className="flex-1 px-6">
          <div className="font-medium text-gray-900">{bonus}</div>
          <div className="text-sm text-primary mt-1 flex items-center">
            <span className="mr-1">🎁</span>
            {bonusDescription}
          </div>
        </div>
 
        {/* Action */}
        <div className="flex-shrink-0 w-32">
          <button
      
            className="w-full border-primary text-primary hover:bg-primary hover:text-white transition-colors"
          >
            Claim Offer &gt;
          </button>
          <div className="text-xs text-gray-500 mt-1 text-center">See More</div>
        </div>
      </div>
 
      {/* Mobile Layout */}
      <div className="md:hidden">
        <div className="flex items-start space-x-3">
          {/* Rank & Logo */}
          <div className="flex-shrink-0">
            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium text-xs mb-2">
              {rank}
            </div>
            <div className={`w-12 h-8 rounded flex items-center justify-center ${backgroundColor}`}>
              <div className="text-white font-bold text-xs">{name}</div>
            </div>
          </div>
 
          {/* Content */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-gray-900">{name}</h3>
              <button
           
                className="border-primary text-primary hover:bg-primary hover:text-white transition-colors"
              >
                Claim &gt;
              </button>
            </div>
            <div className="flex items-center space-x-1 mb-2">
              {renderStars(rating)}
            </div>
            <div className="font-medium text-gray-900 text-sm">{bonus}</div>
            <div className="text-xs text-primary mt-1 flex items-center">
              <span className="mr-1">🎁</span>
              {bonusDescription}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default BookmakerCard;
 