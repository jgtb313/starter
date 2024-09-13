import axios from 'axios'

export const SocialAuthFacebook = async (token: string) => {
  const { data } = await axios.get(`https://graph.facebook.com/v14.0/me?fields=email,name&access_token=${token}`)

  return {
    id: data.id,
    name: data.name,
    email: data?.email
  }
}
