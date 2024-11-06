import { Link, useRouteError } from '@remix-run/react'
import { Provider, Layout, Flex, Button, Typography } from '@ss/components'
import { get } from '@ss/shared'

import { isProd } from '~/support/utilities'
import { useApp } from '~/stores'
import { Shell } from '~/Shell'
import { ToggleColorScheme } from '~/common'
import classes from './Error.module.css'

type ErrorContent = { status: string; title: string; description: string; buttonText?: string }

const errors: Record<number, ErrorContent> = {
  401: {
    status: '401',
    title: 'Não autorizado',
    description:
      'Você não tem permissão para acessar esta página. Verifique suas credenciais e tente novamente. Se você acha que isso é um erro, entre em contato com o suporte.',
    buttonText: 'Voltar para a página inicial'
  },
  404: {
    status: '404',
    title: 'Página não encontrada',
    description:
      'A página que você está tentando abrir não existe. Você pode ter digitado o endereço errado ou a página pode ter sido movida para outro URL. Se você acha que isso é um erro, entre em contato com o suporte.',
    buttonText: 'Voltar para a página inicial'
  },
  500: {
    status: '500',
    title: 'Ocorreu um erro',
    description:
      'Algo deu errado ao carregar a página. Por favor, tente novamente mais tarde. Se o problema persistir, entre em contato com o suporte.',
    buttonText: 'Voltar para a página inicial'
  }
}

const Wrapper = ({ status, title, description, buttonText }: ErrorContent) => {
  const { logout } = useApp()

  const handleBack = () => {
    if (status === '401') {
      logout()
      window.location.href = '/sign-in'

      return
    }

    window.location.href = '/'
  }

  return (
    <Shell>
      <Provider Link={Link}>
        <Layout>
          <Layout.Content>
            <div className={classes.root}>
              <div className={classes.inner}>
                <div className={classes.label}>{status}</div>

                <div className={classes.content}>
                  <Typography className={classes.title} component="h1">
                    {title}
                  </Typography>

                  <Typography className={classes.description} component="p" c="dimmed" size="lg" ta="center">
                    {description}
                  </Typography>

                  {buttonText && (
                    <Flex direction="row" justify="center">
                      <Button size="md" onClick={handleBack}>
                        {buttonText}
                      </Button>
                    </Flex>
                  )}
                </div>
              </div>
            </div>

            <Flex pos="fixed" top={12} right={12}>
              <ToggleColorScheme />
            </Flex>
          </Layout.Content>
        </Layout>
      </Provider>
    </Shell>
  )
}

export const ErrorLayout = () => {
  const err = useRouteError()
  const status = (get(err, 'status') as unknown as number) ?? 500
  const errorContent = errors[status] ?? errors['500']

  if (isProd()) {
    return <Wrapper {...errorContent} />
  }

  const error = err as Error

  return <Wrapper status={status.toString()} title={error.message} description={error.stack ?? error.name} />
}
