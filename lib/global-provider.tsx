import { createContext, ReactNode, useContext } from "react"
import { useAppwrite } from "@/lib/useAppwrite"
import { getCurrentUser } from "@/lib/appwrite"

interface User {
  $id: string
  name: string
  email: string
  avatar: string
}

interface GlobalContextType {
  isLoggedIn: boolean
  user: User | null
  loading: boolean
  refetch: (newParams?: Record<string, string | number>) => Promise<void>
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined)

interface GlobalProviderProps {
  children: ReactNode
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const { data: user, loading, refetch: originalRefetch} = useAppwrite({ fn: getCurrentUser, })

  const isLoggedIn: boolean = !!user

  const transformedUser: User | null = user ? {
    $id: user.$id,
    name: user.name,
    email: user.email,
    avatar: user.avatar
  } : null

  const refetch = (newParams?: Record<string, string | number>) => {
    return originalRefetch(newParams || {})
  }

  return (
    <GlobalContext.Provider value={{isLoggedIn, user: transformedUser, loading, refetch}}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = (): GlobalContextType => {
  const context: GlobalContextType | undefined = useContext(GlobalContext)
  if(!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider")
  }
  return context
}

export default GlobalProvider