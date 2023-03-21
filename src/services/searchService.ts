// services
import * as tokenService from './tokenService'

// types 
import { Show, ShowResult } from "../types/models";


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

async function findShow(showId: number): Promise<ShowResult> {
  try {
    const res = await fetch(`${BASE_URL}/shows/show/${showId}`, {
      headers: { 'Authorization': `Bearer ${tokenService.getToken()}` }
    })
    return await res.json()
  } catch (error) {
    throw error
  }
}
//! replace any with Season type
async function findSeason(showId: number, seasonNumber: number): Promise<any> {
  try {
    const res = await fetch(`${BASE_URL}/show/${showId}/season/${seasonNumber}`, {
      headers: { 'Authorization': `Bearer ${tokenService.getToken()}` }
    })
    return await res.json()
  } catch (error) {
    throw error
  }
}

//! replace any with Season type
async function findCast(showId: number, seasonNumber: number, episodeNumber: number): Promise<any> {
  try {
    const res = await fetch(`${BASE_URL}/shows/show/${showId}/season/${seasonNumber}/episode/${episodeNumber}`, {
      headers: { 'Authorization': `Bearer ${tokenService.getToken()}` }
    })
    return await res.json()
  } catch (error) {
    throw error
  }
}



export { searchShows, findShow, findSeason, findCast }
