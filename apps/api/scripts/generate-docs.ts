import { bootstrap } from '../src/main'

const execute = async () => {
	const app = await bootstrap()

	app.close()
}

execute()
