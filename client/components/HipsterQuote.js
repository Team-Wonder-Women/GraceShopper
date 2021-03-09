import React, { useEffect } from "react";

export default function HipsterQuote() {
	const quotes = [
		`"As long as we don't die, this is gonna be one hell of a story." ~ John Green`,
		`"Rather be dead than cool." ~ Kurt Cobain`,
		`"If you don't imagine, nothing ever happens at all." ~ John Green`,
		`"Our lives are composed of a finite set of moments that we choose how to spend." ~ John Green`,
		`"The town was paper, but the memories were not." ~ John Green`,
		`"A day without sunshine is like, you know, night." ~ Steve Martin`,
		`"Sometimes the way you think about someone isn't the way they actually are." ~ John Green`,
		`"The visionary is the only realist." ~ Federico Fellini`,
		`"Our fearlessness shall be our secret weapon." ~ John Green`,
		`"Life is hard; it's harder if you're stupid." ~ John Wayne`,
		`"Grateful to be a little boat, full of water, still floating." ~ John Green`,
		`"I see no greatness in my self...I'm a simple-minded, child-like, insipid sort of moronic and kind of akward feeling adolescent." ~ Neal Cassady`,
		`"The world may be broken, but hope is not crazy." ~ John Green`,
		`"You are so busy being YOU that you have no idea how utterly unprecedented you are." ~ John Green`,
		`"Civilization begins with distillation" ~ William Faulkner`,
		`"The most interesting hipsters are ones who stop being hipsters." ~ Greg Fitzsimmons`,
		`"Nothing is really work unless you would rather be doing something else." ~ James M. Barrie`
	];

	const randomQuote = () => {
		return quotes[Math.floor(Math.random() * quotes.length)];
	};

	return (
		<div id="hipster-quote">
			<h4>{randomQuote()}</h4>
		</div>
	);
}
