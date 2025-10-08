import {
	type EntitySubscriberInterface,
	EventSubscriber,
	type InsertEvent,
	type UpdateEvent,
} from 'typeorm'

@EventSubscriber()
export class ColumnFilterSubscriber implements EntitySubscriberInterface {
	beforeUpdate(event: UpdateEvent<{}>) {
		if (!event.entity) {
			return
		}

		const columns = event.metadata.columns.map((col) => col.propertyName)

		for (const key of Object.keys(event.entity)) {
			if (!columns.includes(key)) {
				delete (event.entity as any)[key]
			}
		}
	}

	beforeInsert(event: InsertEvent<{}>) {
		if (!event.entity) {
			return
		}

		const columns = event.metadata.columns.map((col) => col.propertyName)

		for (const key of Object.keys(event.entity)) {
			if (!columns.includes(key)) {
				delete (event.entity as any)[key]
			}
		}
	}
}
