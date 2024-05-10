"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";
import {
	Combobox,
	ComboboxInput,
	ComboboxOption,
	ComboboxOptions,
} from "@headlessui/react";

const reviews = [
	{ slug: "celeste-2", title: "Celeste 2 update 1" },
	{ slug: "hades-2018", title: "Hades" },
	{ slug: "fall-guys", title: "Fall Guys: Ultimate Knockout" },
	{ slug: "black-mesa", title: "Black Mesa" },
	{ slug: "disco-elysium", title: "Disco Elysium" },
];

export default function SearchBox() {
	const router = useRouter();
	const [query, setQuery] = useState<string>("");
	const [debouncedQuery] = useDebounce(query, 300);
	const [reviews, setReviews] = useState([]);

	const handleChange = (review) => {
		if (!review) {
			return null;
		}

		router.push(`/reviews/${review.slug}`);
	};
	// console.log("[searchBox]", { query, debouncedQuery });
	useEffect(() => {
		if (debouncedQuery.length > 1) {
			const controller = new AbortController();
			const signal = controller.signal;
			(async () => {
				const url =
					"/api/search?query=" + encodeURIComponent(debouncedQuery);
				const response = await fetch(url, {
					signal,
				});
				const reviews = await response.json();
				setReviews(reviews);
			})();
			return () => controller.abort();
		} else {
			setReviews([]);
		}
	}, [debouncedQuery]);

	return (
		<div className="relative">
			<Combobox onChange={handleChange}>
				<ComboboxInput
					className="border rounded px-2 py-1 w-48"
					value={query}
					onChange={(event) => setQuery(event.target.value)}
					placeholder="Search..."
				/>
				<ComboboxOptions className="absolute py-1 w-full">
					{reviews.map((review) => (
						<ComboboxOption
							key={review.slug}
							className="cursor-pointer bg-white w-full"
							value={review}
						>
							{({ focus }) => (
								<span
									className={`block truncate px-2 w-full ${
										focus ? "bg-orange-100" : ""
									}`}
								>
									{review.title}
								</span>
							)}
						</ComboboxOption>
					))}
				</ComboboxOptions>
			</Combobox>
		</div>
	);
}
