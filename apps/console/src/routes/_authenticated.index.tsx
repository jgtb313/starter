import { deepReplace, uuid } from '@starter/common'
import { PixSchema, z } from '@starter/schema'
import { useI18n } from '@starter/react-i18n'

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/')({
	component: RouteComponent,
})

function RouteComponent() {
	const i18n = useI18n()

	console.log({
		PixSchema,
		z,
		uuid,
		deepReplace,
	})

	return (
		<div>
			Index! Current locale: {i18n.locale}
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
				type='button'
				onClick={() => i18n.setLocale('en')}
			>
				EN
			</button>
			<button
				type='button'
				onClick={() => i18n.setLocale('es')}
			>
				ES
			</button>
			<button
				type='button'
				onClick={() => i18n.setLocale('pt-BR')}
			>
				PT-BR
			</button>
		</div>
	)
}
