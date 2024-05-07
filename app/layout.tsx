import { ReactNode } from "react";
import NavBar from "@/components/NavBar";
import "./globals.css";
import { exo_2, orbitron } from "./fonts";

type LayoutProps = {
	children: ReactNode;
};

export const metadata = {
	title: {
		default: "Indie Gamer",
		template: "%s | Indie Gamer",
	},
};

export default function RootLayout({ children }: LayoutProps) {
	return (
		<html className={`${exo_2.variable} ${orbitron.variable}`} lang="en">
			<body className="bg-orange-100 flex flex-col px-4 py-2 min-h-screen">
				<header>
					<NavBar />
				</header>
				<main className="grow py-3">{children}</main>
				<footer className="border-t py-3 text-center text-xs text-slate-500">
					Game datas and images courtesy of{" "}
					<a
						className="text-orange-800 hover:underline"
						href="https://rawg.io/"
						target="_blank"
					>
						RAWG
					</a>{" "}
					| Deployed on Vercel
				</footer>
			</body>
		</html>
	);
}
