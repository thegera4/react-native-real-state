import {Account, Avatars, Client, Databases, Query} from "react-native-appwrite"
import * as Crypto from 'expo-crypto'
import strings from "@/constants/strings"
import {Models} from "react-native-appwrite"

// Appwrite Configuration
export const config = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  galleriesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_GALLERIES_COLLECTION_ID,
  reviewsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID,
  agentsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_AGENTS_COLLECTION_ID,
  propertiesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID,
}

// Appwrite Client
export const client = new Client()

// Set the Appwrite Client configuration
client.setProject(config.projectId!)

// Appwrite Services (to create avatars and accounts)
export const avatar = new Avatars(client)
export const account = new Account(client)
export const databases = new Databases(client)

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
    const response: Models.User<Models.Preferences> = await account.get()
    if(response.$id) {
      const userAvatar: URL = avatar.getInitials(response.name || "N/A")
      return { ...response, avatar: userAvatar }
    }
  } catch (error) {
    console.error(error)
    return undefined
  }
}

/**
 * Function to fetch the properties from the database.
 * @returns {Promise<Record<string, any>[]>} - Returns an array of properties or an empty array if no properties are found.
 */
export async function getLatestProperties(): Promise<Models.Document[]> {
  try {
    const result: Models.DocumentList<Models.Document> = await databases.listDocuments(
      config.databaseId!,
      config.propertiesCollectionId!,
      [Query.orderAsc("$createdAt"), Query.limit(5)]
    )
    return result.documents
  } catch (error) {
    console.error(error)
    return []
  }
}

/**
 * Function to fetch the properties from the database.
 * @param {string} filter - The filter to apply to the query.
 * @param query
 * @param limit
 * @returns {Promise<Models.Document[]>} - Returns an array of properties or an empty array if no properties are found.
 */
export async function getProperties({ filter, query, limit }: { filter: string, query: string, limit: number }): Promise<Models.Document[]> {
  try {
    // First we prepare the query according to the filter, query and limit parameters
    const buildQuery: string[] = [Query.orderDesc("$createdAt")]
    if (filter && filter !== strings.home.ALL) {
      buildQuery.push(Query.equal("type", filter))
    }
    if (query) {
      buildQuery.push(Query.or([
        Query.search("name", query),
        Query.search("address", query),
        Query.search("type", query),
      ]))
    }
    if (limit) {
      buildQuery.push(Query.limit(limit))
    }

    // After the query is built, we fetch the properties from the database
    const result: Models.DocumentList<Models.Document> = await databases.listDocuments(
      config.databaseId!,
      config.propertiesCollectionId!,
      buildQuery
    )
    return result.documents
  } catch (error) {
    console.error(error)
    return []
  }
}