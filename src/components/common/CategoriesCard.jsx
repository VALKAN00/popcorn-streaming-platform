import { Sword, Smile, Ghost, Rocket, Drama, Flame,Skull, CircleQuestionMark } from "lucide-react";

const icons = {
  Action: (
    <Sword className="Card_icon absolute right-4 bottom-4 w-20 h-20 text-white/10 group-hover:scale-110 transition-transform duration-500 ease-in-out" />
  ),
  Drama: (
    <Drama className="Card_icon absolute right-4 bottom-4 w-20 h-20 text-white/10 group-hover:scale-110 transition-transform duration-500 ease-in-out" />
  ),
  Comedy: (
    <Smile className="Card_icon absolute right-4 bottom-4 w-20 h-20 text-white/10 group-hover:scale-110 transition-transform duration-500 ease-in-out" />
  ),
  Horror: (
    <Ghost className="Card_icon absolute right-4 bottom-4 w-20 h-20 text-white/10 group-hover:scale-110 transition-transform duration-500 ease-in-out" />
  ),
  Crime: (
    <Skull className="Card_icon absolute right-4 bottom-4 w-20 h-20 text-white/10 group-hover:scale-110 transition-transform duration-500 ease-in-out" />
  ),
  Mystery: (
    <CircleQuestionMark className="Card_icon absolute right-4 bottom-4 w-20 h-20 text-white/10 group-hover:scale-110 transition-transform duration-500 ease-in-out" />
  ),
  SciFi: (
    <Rocket className="Card_icon absolute right-4 bottom-4 w-20 h-20 text-white/10 group-hover:scale-110 transition-transform duration-500 ease-in-out" />
  ),
  Animation: (
    <Flame className="Card_icon absolute right-4 bottom-4 w-20 h-20 text-white/10 group-hover:scale-110 transition-transform duration-500 ease-in-out" />
  ),
};

export default function CategoriesCard({ Name, classname }) {
  return (
    <div
      className={`${classname} group relative w-[300px] h-[120px] bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 ease-in-out overflow-hidden`}
    >
      <div className="absolute inset-0 z-0">{icons[Name]}</div>
      <div className="relative z-10 flex items-center justify-between h-full px-5 py-4">
        <p className="text-xl font-semibold">{Name}</p>
      </div>
    </div>
  );
}
