// services
import * as tokenService from './tokenService'

// types 
import {  } from "../types/models";

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/comments`


//! remove any type 
async function addComment(profileId: number,  reviewId: number, commentForm: any): Promise<any> {
  try {
    const res = await fetch(`${BASE_URL}/review/${reviewId}/profile/${profileId}`, {
      method: "POST",
      headers: { 
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(commentForm)
    })
    return await res.json()
  } catch (error) {
    console.log(error)
    throw error
  }
}




export { addComment }
