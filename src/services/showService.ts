// services
import * as tokenService from './tokenService'

// types 
import {  } from "../types/models";
import { CreateShowForm } from '../types/forms';

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/shows`

//! remove any type 
async function addShow(profileId: number, showForm:CreateShowForm): Promise<any> {
  try {
    const res = await fetch(`${BASE_URL}/profile/${profileId}`, {
      method: "POST",
      headers: { 
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(showForm)
    })
    return await res.json()
  } catch (error) {
    console.log(error)
    throw error
  }
}

export { addShow }
