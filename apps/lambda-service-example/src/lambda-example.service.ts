import { Injectable } from '@nestjs/common'
import type { NotificationService } from '@starter/domain'
import type { IServerlessService } from '@starter/nestjs-serverless-hoisting'

export type Service = IServerlessService<{}, number>

@Injectable()
export class LambdaExampleService implements Service {
	constructor(private readonly notificationService: NotificationService) {}

	async execute() {
		await this.notificationService.send('EMAIL', {
			template: 'WELCOME',
			recipient: 'jgtb313@gmail.com',
			props: {
				name: 'John',
				getStartedUrl: 'https://google.com',
			},
		})
		return 10
	}
}
