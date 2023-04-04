import { Link } from "react-router-dom";

import { ResultCardProps } from "../../types/props";

import resultCardStyles from "../ResultCard/ResultCard.module.css"

const ResultCard = (props: ResultCardProps) => {

  const { result } = props 

  return (
    <div className={resultCardStyles.card}>
      <img src={`https://www.themoviedb.org/t/p/w188_and_h282_bestv2${result.poster_path}`} alt="" />
      <p>
        <Link to="/tv-show-result" state={{ resultId: result.id }}>
          {result.name}
        </Link>
      </p>
      <p>{result.first_air_date}</p>
    </div>
  );
}

export default ResultCard;