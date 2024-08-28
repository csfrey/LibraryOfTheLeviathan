import { Link } from "react-router-dom";
import { collectionsConfig } from "../constants";

const Home = () => {
  return (
    <div className="">
      <div className="font-brand text-6xl mb-4">Welcome, adventurer...</div>
      <div className="font-brand mb-8 mx-4 bg-amber-100 drop-shadow rounded p-4">
        The <i>Library of the Leviathan</i> exists to catalogue the vast and
        ever-expanding world of 3rd-party content for Dungeons and Dragons 5th
        Edition. There are simply too many PDFs and articles for any one person
        to read through and find the exact thing they want for their game. Thus,
        here you will find a searchable database of all things D&D. However, you
        will not find any of the actual source information. Instead you will
        find short summaries of the content, marked with the source and page so
        you can go and obtain the source for yourself. We do not condone any
        illegal activity, but ultimately, how you obtain that source is up to
        you. All content hosted on this site is protected under Fair Use.
      </div>

      <div className="grid grid-cols-4 gap-6 text-black font-brand">
        {collectionsConfig.map((category, i) => (
          <Link
            key={category.name}
            to={`/collection/${category.name}`}
            className="p-2 rounded-xl border border-black bg-white h-full drop-shadow shadow hover:shadow-lg"
          >
            <div className="flex mb-4">
              <span className="absolute border-2 border-black bg-white rounded-full p-2 drop-shadow shadow-lg -translate-x-4 -translate-y-4">
                {category.icon}
              </span>
              <h2 className="ml-14 text-3xl">{category.display}</h2>
            </div>
            <p>{category.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
