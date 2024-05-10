import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

type PaginationBarProps = {
	href: string;
	page: number;
	pageCount: number;
};

type PaginationLinkProps = PaginationBarProps & {
	sens: "previous" | "next";
};

export default function PaginationBar({
	href,
	page,
	pageCount,
}: PaginationBarProps) {
	return (
		<div className="flex gap-2">
			<PaginationLink
				href="/reviews"
				page={page}
				sens="previous"
				pageCount={pageCount}
			/>
			<span>
				Page {page} of {pageCount}
			</span>
			<PaginationLink
				href="/reviews"
				page={page}
				sens="next"
				pageCount={pageCount}
			/>
		</div>
	);
}

function PaginationLink({ href, page, pageCount, sens }: PaginationLinkProps) {
	if (sens === "previous" && page > 1) {
		return (
			<Link
				className="flex items-center gap-1 border px-2 py-1 text-slate-500 rounded ext-sm 
        hover:bg-orange-100 hover:text-slate-700"
				href={`${href}?page=${page - 1}`}
			>
				<ChevronLeftIcon className="w-4 h-4" />
				<span className="sr-only">Previous page</span>
			</Link>
		);
	}

	if (sens === "next" && page < pageCount) {
		return (
			<Link
				className="flex items-center gap-1 border px-2 py-1 text-slate-500 rounded ext-sm 
        hover:bg-orange-100 hover:text-slate-700"
				href={`${href}?page=${page + 1}`}
			>
				<ChevronRightIcon className="w-4 h-4" />
				<span className="sr-only">Next page</span>
			</Link>
		);
	}

	return null;
}
