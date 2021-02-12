import { DrumPad } from "./DrumPad.js";
import { StreamDeck } from "./StreamDeck.js";
		
// Mapping of the buttons, paged
const buttonConfig = [
	{
		0: {
			label: 'Page 1',
			keyCode: 'Digit1',
			textColor: '#fff',
			action: function(e) {
				this.activeButtonPageAtIndex(0);
			},
		},
		1: {
			label: 'Page 2',
			keyCode: 'Digit2',
			action: function(e) {
				this.activeButtonPageAtIndex(1);
			},
		},
		4: {
			image: 'img/daftpunk.jpg',
			width: 600,
			height: 600,
		},
		5: {
			label: 'Work It',
			keyCode: 'KeyQ',
			audio: 'audio/work_it_1.wav',
			action: function(e) {
				this.playSound('KeyQ');
			},
		},
		6: {
			label: 'Make It',
			keyCode: 'KeyW',
			audio: 'audio/make_it_1.wav',
			action: function(e) {
				this.playSound('KeyW');
			},
		},
		7: {
			label: 'Do It',
			keyCode: 'KeyE',
			audio: 'audio/do_it_1.wav',
			action: function(e) {
				this.playSound('KeyE');
			},
		},
		8: {
			label: 'Makes Us',
			keyCode: 'KeyR',
			audio: 'audio/makes_us_1.wav',
			action: function(e) {
				this.playSound('KeyR');
			},
		},
		10: {
			label: 'Harder',
			keyCode: 'KeyA',
			audio: 'audio/harder_1.wav',
			action: function(e) {
				this.playSound('KeyA');
			},
		},
		11: {
			label: 'Better',
			keyCode: 'KeyS',
			audio: 'audio/better_1.wav',
			action: function(e) {
				this.playSound('KeyS');
			},
		},
		12: {
			label: 'Faster',
			keyCode: 'KeyD',
			audio: 'audio/faster_1.wav',
			action: function(e) {
				this.playSound('KeyD');
			},
		},
		13: {
			label: 'Stronger',
			keyCode: 'KeyF',
			audio: 'audio/stronger_1.wav',
			action: function(e) {
				this.playSound('KeyF');
			},
		},
	},
	{
		0: {
			label: 'Page 1',
			keyCode: 'Digit1',
			action: function(e) {
				this.activeButtonPageAtIndex(0);
			},
		},
		1: {
			label: 'Page 2',
			keyCode: 'Digit2',
			textColor: '#fff',
			action: function(e) {
				this.activeButtonPageAtIndex(1);
			},
		},
		4: {
			image: 'img/daftpunk.jpg',
			width: 600,
			height: 600,
		},
		5: {
			label: 'More Than',
			keyCode: 'KeyU',
			audio: 'audio/more_than_1.wav',
			action: function(e) {
				this.playSound('KeyU');
			},
		},
		6: {
			label: 'Hour',
			keyCode: 'KeyI',
			audio: 'audio/hour_1.wav',
			action: function(e) {
				this.playSound('KeyI');
			},
		},
		7: {
			label: 'Our',
			keyCode: 'KeyO',
			audio: 'audio/our_1.wav',
			action: function(e) {
				this.playSound('KeyO');
			},
		},
		8: {
			label: 'Never',
			keyCode: 'KeyP',
			audio: 'audio/never_1.wav',
			action: function(e) {
				this.playSound('KeyP');
			},
		},
		10: {
			label: 'Ever',
			keyCode: 'KeyJ',
			audio: 'audio/ever_1.wav',
			action: function(e) {
				this.playSound('KeyJ');
			},
		},
		11: {
			label: 'After',
			keyCode: 'KeyK',
			audio: 'audio/after_1.wav',
			action: function(e) {
				this.playSound('KeyK');
			},
		},
		12: {
			label: 'Work Is',
			keyCode: 'KeyL',
			audio: 'audio/work_is_1.wav',
			action: function(e) {
				this.playSound('KeyL');
			},
		},
		13: {
			label: 'Over',
			keyCode: 'Semicolon',
			audio: 'audio/over_1.wav',
			action: function(e) {
				this.playSound('Semicolon');
			},
		},
	},
];

const go = async () => {

	const drumPad = new DrumPad(buttonConfig, document.querySelector("#app"));
	await drumPad.init();

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
}
go();