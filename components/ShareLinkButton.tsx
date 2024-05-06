"use client";
import { LinkIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

export default function ShareLinkButton() {
	const [clicked, setClicked] = useState(false);

	function handleClick() {
		navigator.clipboard.writeText(window.location.href);
		setClicked(true);
		setTimeout(() => setClicked(false), 1500);
	}

	return (
		<button
			onClick={handleClick}
			className="flex items-center gap-1 border px-2 py-1 text-slate-500 rounded ext-sm hover:bg-orange-100 hover:text-slate-700"
		>
			<LinkIcon className="w-4 h-4" />
			{clicked ? "Link copied" : "Share Button"}
		</button>
	);
}
