import { Link } from "react-router-dom";

import { ResultCardProps } from "../../types/props";

import resultCardStyles from "../ResultCard/ResultCard.module.css"

const ResultCard = (props: ResultCardProps) => {

  const { result } = props

  return (
    <Link to="/tv-show-result" state={{ resultId: result.id }} className={resultCardStyles.card}>
      {result.poster_path ?
        <img src={`https://www.themoviedb.org/t/p/w188_and_h282_bestv2${result.poster_path}`} alt="" />
        :
        <img src="/noimageavailable.jpeg" alt="" />
      }
      <p>
        {result.name}
      </p>
      <p>{result.first_air_date}</p>
    </Link>
  );
}

export default ResultCard;