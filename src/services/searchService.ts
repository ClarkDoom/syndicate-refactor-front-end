// services
import * as tokenService from './tokenService'

// types 
import { Show } from "../types/models";


const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/search`


//! replace any with proper type
async function searchShows(query: string): Promise<any> {
  try {
    const res = await fetch(`${BASE_URL}/shows/${query}`, {
      headers: { 'Authorization': `Bearer ${tokenService.getToken()}` }
    })
    return await res.json()
  } catch (error) {
    throw error
  }
}

async function findShow(showId: number): Promise<Show> {
  try {
    const res = await fetch(`${BASE_URL}/shows/show/${showId}`, {
      headers: { 'Authorization': `Bearer ${tokenService.getToken()}` }
    })
    return await res.json()
  } catch (error) {
    throw error
  }
}



export { searchShows, findShow }
