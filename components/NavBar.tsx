import NavLink from "./NavLink";

export default function NavBar() {
	return (
		<nav>
			<ul className="flex gap-2">
				<li className="font-bold font-orbitron">
					<NavLink href="/">Indie gamers</NavLink>
				</li>
				<li className="ml-auto font-bold font-orbitron">
					<NavLink href="/reviews">Reviews</NavLink>
				</li>
				<li className="font-bold font-orbitron">
					<NavLink href="/about" prefetch={false}>
						About
					</NavLink>
				</li>
			</ul>
		</nav>
	);
}
