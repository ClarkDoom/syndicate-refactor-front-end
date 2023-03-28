import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import * as showService from '../../services/showService'

import { ProfileListsProps } from "../../types/props";
import { Show } from "../../types/models";
import ListCard from '../../components/ListCard/ListCard';


import ListsStyles from "../Lists/Lists.module.css"

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

  const handleListChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event)
    const target = event.target as HTMLSelectElement
    setSelectedList(target.id);
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
    <div className={ListsStyles.page}>
      <div className={ListsStyles.wrapper}>
        <div className={ListsStyles.listNavigation}>
          <div>Filter by List Type :</div>
          <div className={ListsStyles.listNavigationButtons}>
            <button id=" " onClick={handleListChange}>All</button>
            <button id="watchlist" onClick={handleListChange}>Watchlist</button>
            <button id="currently watching" onClick={handleListChange}>Currently Watching</button>
            <button id="seen it" onClick={handleListChange}>Seen It</button>
          </div>
          <div>
            <div>Custom Lists :</div>
            <div>COMING SOON</div>
          </div>
        </div>
        <div className={ListsStyles.cardList}>
          {filteredShows.map((show: any, index: number) => (
            <ListCard show={show} selectedList={selectedList} changeListType={changeListType} deleteShow={deleteShow} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Watchlist;