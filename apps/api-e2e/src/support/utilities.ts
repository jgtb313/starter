import client, { signIn, signUp } from '@starter/client'

type User = {
  name: string
  email: string
  password: string
}

export const generateName = () => `User ${Math.random().toString(36).substring(7)}`

export const generateEmail = () => `${Math.random().toString(36).substring(7)}@example.com`

export const generateUser = () => {
  const name = generateName()
  const email = generateEmail()
  const password = '123123123'

  return {
    name,
    email,
    password,
  }
}

export const ensureUserExists = async (input?: User) => {
  const user = input ? input : generateUser()

  await signUp(user)

  return user
}

export const ensureAuthenticated = async (input?: User) => {
  const user = await ensureUserExists(input)

  const { accessToken } = await signIn({ email: user.email, password: user.password })
  client.authenticate(accessToken)

  return {
    user,
    unauthenticate: client.unauthenticate,
  }
}

export const generatePhoneNumber = () => {
  return `${Math.floor(Math.random() * 90) + 10}${Math.floor(Math.random() * 900000000) + 100000000}`
}
