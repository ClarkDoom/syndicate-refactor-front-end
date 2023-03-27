import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import * as showService from '../../services/showService'

import { ProfileListsProps } from "../../types/props";
import { Show } from "../../types/models";
import ListCard from '../../components/ListCard/ListCard';

const Watchlist = (props: ProfileListsProps) => {
  const location = useLocation()
  const listType = location.state?.listType
  const { profileId } = props

  //! remove any type
  const [profileShows, setProfileShows] = useState<any>([])
  const [selectedList, setSelectedList] = useState(listType ? listType : "")
  
  useEffect((): void => {
    const fetchProfileShows = async (): Promise<any> => {
      try {
        const showsData = await showService.getProfileShows(profileId)
        setProfileShows(showsData)
      } catch (error) {
        console.log(error)
      }
    }
    fetchProfileShows()
    // rerender shows when selectedList changes
  }, [selectedList])
  
  const [filteredShows, setFilteredShows] = useState(profileShows)

  //! remove any type - filter functions
  const filterByListType = (filteredData: any) => {
    if (!selectedList) {
      return filteredData;
    }
    const filteredLists = filteredData.filter(
      (show: Show) => show.showType.indexOf(selectedList) !== -1
    );
    return filteredLists;
  };

  const handleListChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const target = event.target as HTMLSelectElement
    setSelectedList(target.value);
  };

  useEffect(() => {
    const filteredData = filterByListType(profileShows);
    setFilteredShows(filteredData);
  },
    [selectedList, profileShows]);

  //! remove any type - update showType
  const changeListType = async (evt: any) => {
    const target = evt.target as HTMLButtonElement
    try {
      await showService.updateShow(Number(target.id), { showType: target.value })
      setSelectedList(target.value)
    } catch (err) {
      console.log(err)
    }
  }

  //! remove any type 
  const deleteShow = async (evt: any) => {
    const target = evt.target as HTMLButtonElement
    try {
      await showService.deleteShow(Number(target.id))
      alert("Show Deleted")
      setSelectedList("")
    } catch (err) {
      console.log(err)
    }
  }

  if (!profileShows) return <h1>loading</h1>

  return (
    <>
      <div className="list-filter">
        <div>Filter by List Type :</div>
        <select
          id="brand-input"
          value={selectedList}
          onChange={handleListChange}
        >
          <option value="">All</option>
          <option value="watchlist">Watchlist</option>
          <option value="currently watching">Currently Watching</option>
          <option value="seen it">Seen It</option>
        </select>
      </div>

      <div id="show-list">
        {filteredShows.map((show: any, index: number) => (
          <ListCard show={show} selectedList={selectedList} changeListType={changeListType} deleteShow={deleteShow}/>
          // <div className="show-item" key={index}>
          //   <div className="show-name">{`Name: ${show.showName}`}</div>
          //   <div className="show-description">{`Overview: ${show.showDescription}`}</div>
          //   <img src={`https://www.themoviedb.org/t/p/w188_and_h282_bestv2${show.imageUrl}`} alt="" className="show-image" />
          //   {selectedList === "watchlist" &&
          //     <div>
          //       <button id={show.id} value="currently watching" onClick={changeListType}>Currently Watching</button>
          //       <button id={show.id} onClick={deleteShow}>Remove</button>
          //     </div>
          //   }
          //   {selectedList === "currently watching" &&
          //     <div>
          //       <button id={show.id} value="seen it" onClick={changeListType}>Seen It</button>
          //       <button id={show.id} onClick={deleteShow}>Remove</button>
          //     </div>
          //   }
          //   {selectedList === "seen it" &&
          //     <div>
          //       <button>
          //         <Link to="/create-review" state={{showId: show.id}}>
          //         Write Review
          //         </Link>
          //       </button>
          //       <button id={show.id} onClick={deleteShow}>Remove</button>
          //     </div>
          //   }
          // </div>
        ))}
      </div>
    </>
  );
}

export default Watchlist;