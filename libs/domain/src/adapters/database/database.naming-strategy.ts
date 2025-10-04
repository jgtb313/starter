import { DefaultNamingStrategy, type NamingStrategyInterface } from 'typeorm'
import { snakeCase } from 'typeorm/util/StringUtils'

export class NamingStrategy
	extends DefaultNamingStrategy
	implements NamingStrategyInterface
{
	columnName(
		propertyName: string,
		customName: string,
		embeddedPrefixes: string[],
	) {
		return snakeCase(
			embeddedPrefixes.concat(customName ?? propertyName).join('_'),
		)
	}

	relationName(propertyName: string) {
		return snakeCase(propertyName)
	}
}
