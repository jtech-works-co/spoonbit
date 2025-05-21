import { LucideBell, LucidePlusSquare } from "lucide-react";
import * as React from "react";
import { Link } from "react-router-dom";

interface TopBarProps {
	className?: string;
	style?: React.CSSProperties;
}

const TopBar: React.FC<TopBarProps> = ({
	className = '',
	style = {},
}) => {
	return (
		<div className={`topbar ${className}`}>
			<div className="logo">
				<h1>Spoonbit</h1>
			</div>

			<div className="actions">

				<div className="query">
					<input type="text" />
				</div>


				<Link className="action" to='/create-recipe'>
					<LucidePlusSquare className="icon" />
				</Link>

				<button className="action">
					<LucideBell className="icon" />
				</button>
			</div>
		</div>
	);
}

export default TopBar;