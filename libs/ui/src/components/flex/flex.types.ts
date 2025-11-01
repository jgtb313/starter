export interface FlexProps {
	children?: React.ReactNode
	direction?: 'row' | 'col' | 'row-reverse' | 'col-reverse'
	align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline'
	justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
	gap?: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12' | '16'
	wrap?: 'wrap' | 'nowrap' | 'wrap-reverse'
	className?: string
}
