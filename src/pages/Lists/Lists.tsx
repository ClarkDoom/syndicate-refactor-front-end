import { useEffect, useState } from 'react';

import * as showService from '../../services/showService'

import { ProfileListsProps } from "../../types/props";
import { Show } from "../../types/models";

const Watchlist = (props: ProfileListsProps) => {

  const { profile } = props
  const shows = profile.shows

  const [filteredShows, setFilteredShows] = useState(shows)
  const [selectedList, setSelectedList] = useState("")

  //! remove any type
  const filterByListType = (filteredData: any) => {
    if (!selectedList) {
      return filteredData;
    }
    const filteredLists = filteredData.filter(
      (show: Show) => show.showType.indexOf(selectedList) !== -1
    );
    return filteredLists;
  };

  //! remove any type
  const handleListChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const target = event.target as HTMLSelectElement
    setSelectedList(target.value);
  };

  useEffect(() => {
    const filteredData = filterByListType(shows);
    setFilteredShows(filteredData);
  }, 
  [selectedList, profile]);

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
          <option value="currently watching">Currenlty Watching</option>
          <option value="seen it">Seen It</option>
          <option value="favorite">Favorite</option>
        </select>
      </div>

      <div id="show-list">
        {filteredShows.map((item: any, index: number) => (
          <div className="show-item" key={index}>
            <div className="show-name">{`Name: ${item.showName}`}</div>
            <div className="show-description">{`Name: ${item.showDescription}`}</div>
            <img src={`https://www.themoviedb.org/t/p/w188_and_h282_bestv2${item.imageUrl}`} alt="" className="show-image" />
          </div>
        ))}
      </div>
    </>
  );
}

export default Watchlist;