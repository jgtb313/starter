import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/')({
	component: RouteComponent,
})

function RouteComponent() {
	// const i18n = useI18n()

	return (
		<div>
			{/* Index! Current locale: {i18n.locale}
			<br />
			{i18n.t.hello({
				name: 'John',
				age: 20,
			})}
			<br />
			{i18n.t.custom('pt-BR').hello({
				name: 'John',
				age: 20,
			})}
			<br />
			<button
				onClick={() => i18n.setLocale('en')}
				type="button"
			>
				EN
			</button>
			<button
				onClick={() => i18n.setLocale('es')}
				type="button"
			>
				ES
			</button>
			<button
				onClick={() => i18n.setLocale('pt-BR')}
				type="button"
			>
				PT-BR
			</button> */}
		</div>
	)
}
