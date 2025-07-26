import ExploreIcon from "@mui/icons-material/Explore";
import CategoriesCard from "../components/common/CategoriesCard";

import { useNavigate } from "react-router-dom";

export default function CategoriesPage() {
  const Navigate = useNavigate();

  return (
    <>
      <div style={{ width: "100%", height: "calc(100vh - 150px)" }}>
        <div className="flex mt-10 space-x-5 ml-5 items-center">
          <ExploreIcon
            className="text-white mt-2"
            style={{ width: "50px", height: "50px" }}
          />
          <p className="text-5xl font-bold">Categories</p>
        </div>
        <div className="Cat_cards flex flex-wrap justify-center items-center gap-5 mt-10">
          <div className="flex flex-wrap justify-center items-center gap-5">
            <button
              onClick={() => Navigate("/categories/Action")}
              style={{ cursor: "pointer" }}
            >
              <CategoriesCard
                Name="Action"
                classname="Card bg-gradient-to-r from-red-500 to-orange-500 text-white p-5 rounded-lg shadow-lg hover:scale-105 transition duration-300 ease-in-out"
              />
            </button>
            <button
              onClick={() => Navigate("/categories/Drama")}
              style={{ cursor: "pointer" }}
            >
              <CategoriesCard
                Name="Drama"
                classname="Card bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-5 rounded-lg shadow-lg hover:scale-105 transition duration-300 ease-in-out"
              />
            </button>
            <button
              onClick={() => Navigate("/categories/Comedy")}
              className="cursor-pointer"
            >
              <CategoriesCard
                Name="Comedy"
                classname="Card bg-gradient-to-r from-green-500 to-lime-500 text-white p-5 rounded-lg shadow-lg hover:scale-105 transition duration-300 ease-in-out"
              />
            </button>
            <button
              onClick={() => Navigate("/categories/Crime")}
              className="cursor-pointer"
            >
              <CategoriesCard
                Name="Crime"
                classname="Card bg-gradient-to-r from-red-900 to-red-500 text-white p-5 rounded-lg shadow-lg hover:scale-105 transition duration-300 ease-in-out"
              />
            </button>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-5">
            <button
              onClick={() => Navigate("/categories/Horror")}
              className="cursor-pointer"
            >
              <CategoriesCard
                Name="Horror"
                classname="Card bg-gradient-to-r from-purple-500 to-violet-500 text-white p-5 rounded-lg shadow-lg hover:scale-105 transition duration-300 ease-in-out"
              />
            </button>
            <button
              onClick={() => Navigate("/categories/Science Fiction")}
              className="cursor-pointer"
            >
              <CategoriesCard
                Name="SciFi"
                classname="Card bg-gradient-to-r from-yellow-500 to-amber-500 text-white p-5 rounded-lg shadow-lg hover:scale-105 transition duration-300 ease-in-out"
              />
            </button>
            <button
              onClick={() => Navigate("/categories/Mystery")}
              className="cursor-pointer"
            >
              <CategoriesCard
                Name="Mystery"
                classname="Card bg-gradient-to-r from-teal-500 to-cyan-500 text-white p-5 rounded-lg shadow-lg hover:scale-105 transition duration-300 ease-in-out"
              />
            </button>
            <button
              onClick={() => Navigate("/categories/Animation")}
              className="cursor-pointer"
            >
              <CategoriesCard
                Name="Animation"
                classname="Card bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-5 rounded-lg shadow-lg hover:scale-105 transition duration-300 ease-in-out"
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
