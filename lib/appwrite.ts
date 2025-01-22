import {Account, Avatars, Client, OAuthProvider} from "react-native-appwrite"
import * as Linking from 'expo-linking'
import {openAuthSessionAsync, WebBrowserAuthSessionResult} from "expo-web-browser"

// Appwrite Configuration
export const config = {
  platform: 'com.jgmedellin.real_state',
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
}

// Appwrite Client
export const client = new Client()

// Set the Appwrite Client configuration
client.setEndpoint(config.endpoint!).setProject(config.projectId!).setPlatform(config.platform!)

// Appwrite Services (to create avatars and accounts)
export const avatar = new Avatars(client)
export const account = new Account(client)

/**
 * Function to log in with Google.
 * @returns {Promise<boolean>} - Returns a boolean value to indicate if the login was successful.
 */
export async function loginWithGoogle(): Promise<boolean> {
  try{
    const redirectUri: string = Linking.createURL('/')

    const response: void | URL = account.createOAuth2Token(OAuthProvider.Google, redirectUri)
    if(!response) {
      console.error("Failed to create OAuth2 Token!")
      return false
    }

    const browserResult: WebBrowserAuthSessionResult = await openAuthSessionAsync(response.toString(), redirectUri)
    if(browserResult.type !== 'success') {
      console.error("Failed to open the AuthSession!")
      return false
    }

    const url: URL = new URL(browserResult.url)

    const secret: string | undefined = url.searchParams.get('secret')?.toString()
    const userId: string | undefined = url.searchParams.get('userId')?.toString()
    if(!secret || !userId) {
      console.error("Failed to get the secret or userId!")
      return false
    }

    const session = await account.createSession(userId, secret)
    if(!session) {
      console.error("Failed to create the session!")
      return false
    }

    return true
  } catch (error) {
    console.error(error)
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
export async function getUser(): Promise<Record<string, any> | undefined> {
  try {
    const response= await account.get()
    if(response.$id) {
      const userAvatar: URL = avatar.getInitials(response.name)
      return { ...response, avatar: userAvatar }
    }
  } catch (error) {
    console.error(error)
    return undefined
  }
}