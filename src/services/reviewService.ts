// services
import * as tokenService from './tokenService'

// types 
import {  } from "../types/models";

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/reviews`

// '/show/:showId/profile/:profileId'

//! remove any type 
async function addReview(profileId: number, showId: number, reviewForm: any): Promise<any> {
  try {
    const res = await fetch(`${BASE_URL}/show/${showId}/profile/${profileId}`, {
      method: "POST",
      headers: { 
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reviewForm)
    })
    return await res.json()
  } catch (error) {
    console.log(error)
    throw error
  }
}


// //! remove any type
// async function updateShow(showId: number, showForm: any): Promise<any> {
//   try {
//     const res = await fetch(`${BASE_URL}/show/${showId}`, {
//       method: "PATCH",
//       headers: { 
//         'Authorization': `Bearer ${tokenService.getToken()}`,
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(showForm)
//     })
//     return await res.json()
//   } catch (error) {
//     console.log(error)
//     throw error
//   }
// }

// //! remove any type
// async function deleteShow(showId: number): Promise<void> {
//   try {
//     await fetch(`${BASE_URL}/show/${showId}`, {
//       method: 'DELETE',
//       headers: {
//         'Authorization': `Bearer ${tokenService.getToken()}`,
//       },

//     })
//   } catch (err) {
//     throw err
//   }
// }

export { addReview }
