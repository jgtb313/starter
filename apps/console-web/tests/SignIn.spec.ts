import { test, expect } from '@playwright/test'

test('Sign In', async ({ page }) => {
  await page.goto('http://localhost:3000/sign-in')

  await page.getByTestId('signIn-email').fill('thiago7@hotmail.com')
  await page.getByTestId('signIn-password').fill('123')

  await page.getByTestId('signIn-submit').click()

  await expect(page).toHaveURL('http://localhost:3000/invoices')
})

test('Sign In - Nonexistent account', async ({ page }) => {
  await page.goto('http://localhost:3000/sign-in')

  await page.getByTestId('signIn-email').fill('nonexistent@gmail.com')
  await page.getByTestId('signIn-password').fill('123123123')

  await page.getByTestId('signIn-submit').click()

  await page.getByText('Dados de acesso inválidos, por favor tente novamente').isVisible()
})
