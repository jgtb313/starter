const ReactLogo = () => {
	return (
		<svg
			aria-label="React Logo"
			fill="none"
			height="24"
			role="img"
			viewBox="0 0 24 24"
			width="24"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M12 2L2 22h20L12 2Z"
				stroke="currentColor"
				stroke-linejoin="round"
				stroke-width="2"
			/>
		</svg>
	)
}

export const Brand = (props: React.SVGProps<SVGSVGElement>) => {
	return <ReactLogo {...props} />
}
