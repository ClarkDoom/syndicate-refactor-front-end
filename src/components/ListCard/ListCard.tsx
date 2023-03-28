import { ListCardProps } from "../../types/props";
import { Link } from "react-router-dom";

import ListCardStyles from "../ListCard/ListCard.module.css"

const ListCard = (props: ListCardProps) => {
  const { show, selectedList, changeListType, deleteShow } = props

  return (
    <div className={ListCardStyles.card}>
        <img src={`https://www.themoviedb.org/t/p/w188_and_h282_bestv2${show.imageUrl}`} alt="TV Show Poster" />
      <div className={ListCardStyles.buttons}>
        {selectedList === "watchlist" &&
          <>
            <button id={show.id} value="currently watching" onClick={changeListType}>Currently Watching</button>
            <button id={show.id} onClick={deleteShow}>Remove</button>
          </>
        }
        {selectedList === "currently watching" &&
          <>
            <button id={show.id} value="seen it" onClick={changeListType}>Seen It</button>
            <button id={show.id} onClick={deleteShow}>Remove</button>
          </>
        }
        {selectedList === "seen it" &&
          <>
            <button>
              <Link to="/create-review" state={{ showId: show.id }}>
                Write Review
              </Link>
            </button>
            <button id={show.id} onClick={deleteShow}>Remove</button>
          </>
        }
      </div>
    </div>
  );
}

export default ListCard;