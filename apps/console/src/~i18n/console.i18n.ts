import type { I18nDict } from '@starter/i18n'

const en = {
	signIn: 'Sign In',
	signUp: 'Sign Up',
	forgotPassword: 'Forgot Password',
	enterEmailToReset: 'Enter your email to reset your password',
	enterEmailPasswordToSignUp:
		'Enter your email and password to sign up to your account',
	enterEmailPasswordToSignIn:
		'Enter your email and password to sign in to your account',
	email: 'Email',
	name: 'Name',
	password: 'Password',
	continueWithGoogle: 'Continue with Google',
	continueWithFacebook: 'Continue with Facebook',
	signInWithPasskey: 'Sign in with a passkey',
	orContinueWith: 'Or continue with',
	alreadyHaveAccount: 'Already have an account?',
	dontHaveAccount: "Don't have an account?",
	forgotPasswordLink: 'Forgot password',
} as const
type Translations = {
	[K in keyof typeof en]: string
}

const es: Translations = {
	signIn: 'Iniciar sesión',
	signUp: 'Registrarse',
	forgotPassword: 'Olvidé mi contraseña',
	enterEmailToReset:
		'Ingrese su correo electrónico para restablecer su contraseña',
	enterEmailPasswordToSignUp:
		'Ingrese su correo electrónico y contraseña para registrarse en su cuenta',
	enterEmailPasswordToSignIn:
		'Ingrese su correo electrónico y contraseña para iniciar sesión en su cuenta',
	email: 'Correo electrónico',
	name: 'Nombre',
	password: 'Contraseña',
	continueWithGoogle: 'Continuar con Google',
	continueWithFacebook: 'Continuar con Facebook',
	signInWithPasskey: 'Iniciar sesión con una clave de acceso',
	orContinueWith: 'O continuar con',
	alreadyHaveAccount: '¿Ya tienes una cuenta?',
	dontHaveAccount: '¿No tienes una cuenta?',
	forgotPasswordLink: 'Olvidé mi contraseña',
}

const ptBR: Translations = {
	signIn: 'Iniciar sessão',
	signUp: 'Cadastrar-se',
	forgotPassword: 'Esqueci a senha',
	enterEmailToReset: 'Digite seu e-mail para redefinir sua senha',
	enterEmailPasswordToSignUp:
		'Digite seu e-mail e senha para cadastrar-se na sua conta',
	enterEmailPasswordToSignIn:
		'Digite seu e-mail e senha para iniciar sessão na sua conta',
	email: 'E-mail',
	name: 'Nome',
	password: 'Senha',
	continueWithGoogle: 'Continuar com Google',
	continueWithFacebook: 'Continuar com Facebook',
	signInWithPasskey: 'Iniciar sessão com uma chave de acesso',
	orContinueWith: 'Ou continuar com',
	alreadyHaveAccount: 'Já tem uma conta?',
	dontHaveAccount: 'Não tem uma conta?',
	forgotPasswordLink: 'Esqueci a senha',
}

export const i18nDict: I18nDict = {
	en,
	es,
	'pt-BR': ptBR,
}

export type I18nConsole = {
	en: typeof en
	es: typeof es
	'pt-BR': typeof ptBR
}
