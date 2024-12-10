import axios from 'axios'

export const SocialAuthGoogle = async (token: string) => {
  const { data } = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${token}`)

  return {
    id: data.id,
    name: data.name,
    email: data?.verified_email ? data?.email : undefined
  }
}
