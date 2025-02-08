interface ICardProps {
	children: React.ReactNode;
	className?: string;
}

export const Card = ({ children, className }: ICardProps) => {
	return (
		<div className={`${className} bg-zinc-900 rounded-lg shadow-md p-3`}>
			{children}
		</div>
	);
};

export default Card;
