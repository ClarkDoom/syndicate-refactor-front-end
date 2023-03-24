// services
import * as tokenService from './tokenService'
import { addPhoto as addProfilePhoto } from './profileService'

// types
import { Profile } from '../types/models'
import { 

  PhotoFormData
} from '../types/forms'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/profiles`



async function getProfile(profileId: number): Promise<Profile> {
  try {
    const res = await fetch(`${BASE_URL}/${profileId}`, {
      headers: { 'Authorization': `Bearer ${tokenService.getToken()}` }
    })
    return await res.json() as Profile
  } catch (error) {
    throw error
  }
}

async function getAllProfiles(): Promise<Profile[]> {
  try {
    const res = await fetch(BASE_URL, {
      headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
    })
    return await res.json() as Profile[]
  } catch (error) {
    throw error
  }
}

async function addPhoto(
  photoData: FormData, 
  profileId: number
): Promise<string> {
  try {
    const res = await fetch(`${BASE_URL}/${profileId}/add-photo`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`
      },
      body: photoData
    })
    return await res.json() as string
  } catch (error) {
    throw error
  }
}

async function updateProfile(profileId: number, formData: FormData, photoFormData: PhotoFormData): Promise<void> {
  console.log("profileId", profileId)
  try {
    const res = await fetch(`${BASE_URL}/profile/${profileId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    if (photoFormData.photo) {
      const photoData = new FormData()
      photoData.append('photo', photoFormData.photo)
      await addProfilePhoto(photoData, profileId)
    }
    return await res.json()
  } catch (error) {
    throw error
  }
}

export { getAllProfiles, addPhoto, getProfile, updateProfile }
