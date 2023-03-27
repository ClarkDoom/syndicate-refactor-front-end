import { ListCardProps } from "../../types/props";
import { Link } from "react-router-dom";


const ListCard = (props: ListCardProps) => {
  const {show, selectedList, changeListType, deleteShow} = props
  
  return (
    <>
      <div className="show-item">
        <div className="show-name">{`Name: ${show.showName}`}</div>
        <div className="show-description">{`Overview: ${show.showDescription}`}</div>
        <img src={`https://www.themoviedb.org/t/p/w188_and_h282_bestv2${show.imageUrl}`} alt="" className="show-image" />
        {selectedList === "watchlist" &&
          <div>
            <button id={show.id} value="currently watching" onClick={changeListType}>Currently Watching</button>
            <button id={show.id} onClick={deleteShow}>Remove</button>
          </div>
        }
        {selectedList === "currently watching" &&
          <div>
            <button id={show.id} value="seen it" onClick={changeListType}>Seen It</button>
            <button id={show.id} onClick={deleteShow}>Remove</button>
          </div>
        }
        {selectedList === "seen it" &&
          <div>
            <button>
              <Link to="/create-review" state={{ showId: show.id }}>
                Write Review
              </Link>
            </button>
            <button id={show.id} onClick={deleteShow}>Remove</button>
          </div>
        }
      </div>
    </>
  );
}

export default ListCard;