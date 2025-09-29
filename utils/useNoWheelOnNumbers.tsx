import { useEffect } from "react";

export function useNoWheelOnNumber() {
	useEffect(() => {
		const handler = (e: WheelEvent) => {
			const target = e.target as HTMLInputElement;
			if (target.tagName === "INPUT" && target.type === "number") {
				e.preventDefault();
			}
		};

		document.addEventListener("wheel", handler, { passive: false });

		return () => {
			document.removeEventListener("wheel", handler);
		};
	}, []);
}