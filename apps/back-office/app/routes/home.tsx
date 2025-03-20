import type { Route } from './+types/home'

export const meta = ({}: Route.MetaArgs) => {
  return [{ title: 'Starter | App' }]
}

const Page = () => {
  return <div>App</div>
}

export default Page
