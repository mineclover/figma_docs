import { h } from 'preact'

const FilterIcon = ({ size = 24, color = '#5F6368', ...props }) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
			<path
				d="M11.0001 20C10.7167 20 10.4792 19.9042 10.2876 19.7125C10.0959 19.5208 10.0001 19.2833 10.0001 19V13L4.20008 5.6C3.95008 5.26667 3.91258 4.91667 4.08758 4.55C4.26258 4.18333 4.56675 4 5.00008 4H19.0001C19.4334 4 19.7376 4.18333 19.9126 4.55C20.0876 4.91667 20.0501 5.26667 19.8001 5.6L14.0001 13V19C14.0001 19.2833 13.9042 19.5208 13.7126 19.7125C13.5209 19.9042 13.2834 20 13.0001 20H11.0001ZM12.0001 12.3L16.9501 6H7.05008L12.0001 12.3Z"
				fill={color}
			/>
		</svg>
	)
}

export default FilterIcon