"use client";

import { useSyncExternalStore } from "react";

interface GreetingData {
	text: string;
	emoji: string;
	animationClass: string;
}

const DEFAULT_GREETING: GreetingData = {
	text: "",
	emoji: "",
	animationClass: "",
};

const getGreeting = (): GreetingData => {
	const hour = new Date().getHours();

	if (hour >= 5 && hour < 12) {
		return {
			text: "Hey, good morning",
			emoji: "☀️",
			animationClass: "animate-spin-slow",
		};
	} else if (hour >= 12 && hour < 18) {
		return {
			text: "Hey, good afternoon",
			emoji: "☕",
			animationClass: "animate-bounce-gentle",
		};
	} else if (hour >= 18 && hour < 22) {
		return {
			text: "Hey, good evening",
			emoji: "☀️",
			animationClass: "animate-spin-slow",
		};
	} else {
		return {
			text: "Hey, good night",
			emoji: "🌙",
			animationClass: "animate-glow",
		};
	}
};

let cache: GreetingData | null = null;
const getClientSnapshot = (): GreetingData => {
	if (!cache) {
		cache = getGreeting();
	}
	return cache;
};

const getServerSnapshot = (): GreetingData => DEFAULT_GREETING;

const subscribe = () => () => {};

const DynamicGreeting = () => {
	const greeting = useSyncExternalStore(
		subscribe,
		getClientSnapshot,
		getServerSnapshot,
	);

	return (
		<>
			{greeting.text}{" "}
			<span className={greeting.animationClass}>{greeting.emoji}</span>
		</>
	);
};

export default DynamicGreeting;
