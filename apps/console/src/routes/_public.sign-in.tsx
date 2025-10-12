import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/sign-in')({
	component: RouteComponent,
})

function RouteComponent() {
	return <div>Sign In</div>
}
