import { Account, Avatars, Client } from "react-native-appwrite"
import * as Crypto from 'expo-crypto'

// Appwrite Configuration
export const projectId: string | undefined = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID

// Appwrite Client
export const client = new Client()

// Set the Appwrite Client configuration
client.setProject(projectId!)

// Appwrite Services (to create avatars and accounts)
export const avatar = new Avatars(client)
export const account = new Account(client)

/**
 * Function to create a new user.
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<boolean>} - Returns a boolean value to indicate if the user was created or not.
 */
  export async function createUser(email: string, password: string): Promise<boolean> {
    try {
      const uuid: string = Crypto.randomUUID()
      await account.create(uuid, email, password)
      return true
    } catch (error) {
      console.error("Failed to create user: " + error)
      return false
    }
  }

/**
 * Function to log in with email and password.
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<boolean>} - Returns a boolean value to indicate if the login was successful.
 */
export async function loginWithEmailAndPassword(email: string, password: string): Promise<boolean> {
  try{
    await account.createEmailPasswordSession(email, password)
    return true
  } catch (error) {
    console.error("Failed to log in with email and password: " + error)
    return false
  }
}

/**
 * Function to log out.
 * @returns {Promise<boolean>} - Returns a boolean value to indicate if the logout was successful.
 */
export async function logout(): Promise<boolean> {
  try {
    await account.deleteSession('current')
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

/**
 * Function to get the user (and their avatar).
 * @returns {Promise<Record<string, any> | undefined>} - Returns the user info or undefined if the user is not found.
 */
export async function getCurrentUser(): Promise<Record<string, any> | undefined> {
  try {
    const response= await account.get()
    if(response.$id) {
      const userAvatar: URL = avatar.getInitials(response.name || "N/A")
      return { ...response, avatar: userAvatar }
    }
  } catch (error) {
    console.error(error)
    return undefined
  }
}