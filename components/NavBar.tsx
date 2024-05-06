import Link from "next/link";

export default function NavBar() {
	return (
		<nav>
			<ul className="flex gap-2">
				<li>
					<Link
						className="font-bold font-orbitron text-orange-800 hover:underline"
						href="/"
					>
						Indie gamers
					</Link>
				</li>
				<li className="ml-auto">
					<Link
						className="text-orange-800 hover:underline"
						href="/reviews"
					>
						Reviews
					</Link>
				</li>
				<li>
					<Link
						className="text-orange-800 hover:underline"
						href="/about"
						prefetch={false}
					>
						About
					</Link>
				</li>
			</ul>
		</nav>
	);
}
