import { DrumPad } from "./DrumPad.js";
import { StreamDeck } from "./StreamDeck.js";

const fragments = {
	KeyQ: { url: "audio/work_it_1.wav", label: "Work it" },
	KeyW: { url: "audio/make_it_1.wav", label: "Make it" },
	KeyE: { url: "audio/do_it_1.wav", label: "Do it" },
	KeyR: { url: "audio/makes_us_1.wav", label: "Makes us" },
	
	KeyA: { url: "audio/harder_1.wav", label: "Harder" },
	KeyS: { url: "audio/better_1.wav", label: "Better" },
	KeyD: { url: "audio/faster_1.wav", label: "Faster" },
	KeyF: { url: "audio/stronger_1.wav", label: "Stronger" },
	
	KeyU: { url: "audio/more_than_1.wav", label: "More than" },
	KeyI: { url: "audio/hour_1.wav", label: "Hour" },
	KeyO: { url: "audio/our_1.wav", label: "Our" },
	KeyP: { url: "audio/never_1.wav", label: "Never" },
	
	KeyJ: { url: "audio/ever_1.wav", label: "Ever" },
	KeyK: { url: "audio/after_1.wav", label: "After" },
	KeyL: { url: "audio/work_is_1.wav", label: "Work is" },
	Semicolon: { url: "audio/over_1.wav", label: "Over" },
};

const drumPad = new DrumPad(fragments, document.querySelector("#app"));

if (navigator.hid) {
	const streamDeck = new StreamDeck();

	const connectStreamDeck = async () => {
		// Connect to previously connected device
		await streamDeck.connect();

		// A previously connected device was found
		if (streamDeck.isConnected) {
			drumPad.attachStreamDeck(streamDeck);
		}

		// No Previously connected device was found
		else {
			// Add button to connect new device
			const elem = document.createElement("button");
			elem.type = "button";
			elem.innerText = "Connect StreamDeck";
			elem.style = "position: absolute;top: 100px;left:100px;z-index:100";
			elem.addEventListener("click", async () => {
				elem.remove();
				await streamDeck.connect(true);
				drumPad.attachStreamDeck(streamDeck);
			});
			document.body.appendChild(elem);
		}
	};
	
	connectStreamDeck();
}