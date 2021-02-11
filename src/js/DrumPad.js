class DrumPad {
	targetNode = null;
	fragments = null;
	streamDeck = null;

	constructor(fragments, targetNode) {
		this.targetNode = targetNode;
		this.fragments = fragments;
		this.bindEvents();
		this.render();
	}

	bindEvents() {
		document.addEventListener("keydown", (e) => {
			this.playSound(e.code);
		});
		document.addEventListener("click", (e) => {
			if (e.target.nodeName == "AUDIO") {
				this.playSound(e.target.getAttribute("id"));
			}
		});
	}

	playSound(keyCode) {
		const $el = document.getElementById(keyCode);
		
		if (!$el) {
			return;
		}

		$el.currentTime = 0;
		$el.play();
	}

	attachStreamDeck(streamDeck) {
		this.streamDeck = streamDeck;
		
		// Builds an object that configures a StreamDeck Button
		const buildButtonMapConfigObjectForKeyCode = (keyCode) => {
			return {
				label: this.fragments[keyCode].label,
				action: (e) => {
					this.playSound(keyCode);
				},
			};
		};
		
		// Draws a bit of text on a certain button
		const drawText = (index, textString, backgroundColor, textColor) => {
			var ICON_SIZE = 72,
				ICON_SIZE_HALF = ICON_SIZE / 2,
				canvas = new OffscreenCanvas(ICON_SIZE, ICON_SIZE),
				ctx = canvas.getContext("2d"),
				fontSize = 12;

			canvas.width = ICON_SIZE;
			canvas.height = ICON_SIZE;
			
			// Text was rotated 180 degrees. This fixes it somehow …
			ctx.translate(ICON_SIZE_HALF, ICON_SIZE_HALF);
			ctx.rotate(180 * Math.PI / 180);
			ctx.translate(ICON_SIZE_HALF * -1, ICON_SIZE_HALF * -1);
						
			ctx.fillStyle = backgroundColor;
		    ctx.fillRect(0, 0, canvas.width, canvas.height);
			
			ctx.font = `normal bold ${fontSize}px sans-serif`;
			ctx.fillStyle = textColor;

			var textWidth = ctx.measureText(textString).width;

			ctx.fillText(textString , (canvas.width/2) - (textWidth / 2), (canvas.height + fontSize) / 2);
						
			this.streamDeck.fillCanvas(index, canvas);
		}
		
		let activePage = 0;
		
		const renderButtonPage = (index) => {
			const buttons = buttonMap[index];	
		
			this.streamDeck.clearAllButtons();

			Object.entries(buttons).forEach(([index, button]) => {	
				if (button.label) {
					drawText(index, button.label, button.background ?? 'black', button.color ?? 'red');
				} else if (button.image) {
					this.streamDeck.fillURL(index, button.image, true);
				}
			});
			
			activePage = index;
		};
		
		// Our mapping of buttons, in several pages
		const buttonMap = [
			{
				0: {
					label: 'Page 1',
					color: '#FFF',
					background: '#111',
					action: (e) => {
						renderButtonPage(0);
					},
				},
				1: {
					label: 'Page 2',
					color: 'red',
					background: '#111',
					action: (e) => {
						renderButtonPage(1);
					},
				},
				4: {
					image: 'img/daftpunk.jpg',
					width: 600,
					height: 600,
				},
				5: buildButtonMapConfigObjectForKeyCode('KeyQ'),
				6: buildButtonMapConfigObjectForKeyCode('KeyW'),
				7: buildButtonMapConfigObjectForKeyCode('KeyE'),
				8: buildButtonMapConfigObjectForKeyCode('KeyR'),
				10: buildButtonMapConfigObjectForKeyCode('KeyA'),
				11: buildButtonMapConfigObjectForKeyCode('KeyS'),
				12: buildButtonMapConfigObjectForKeyCode('KeyD'),
				13: buildButtonMapConfigObjectForKeyCode('KeyF'),
			},
			{
				0: {
					label: 'Page 1',
					color: 'red',
					background: '#111',
					action: (e) => {
						renderButtonPage(0);
					},
				},
				1: {
					label: 'Page 2',
					color: '#FFF',
					background: '#111',
					action: (e) => {
						renderButtonPage(1);
					},
				},
				4: {
					image: 'img/daftpunk.jpg',
					width: 600,
					height: 600,
				},
				5: buildButtonMapConfigObjectForKeyCode('KeyU'),
				6: buildButtonMapConfigObjectForKeyCode('KeyI'),
				7: buildButtonMapConfigObjectForKeyCode('KeyO'),
				8: buildButtonMapConfigObjectForKeyCode('KeyP'),
				10: buildButtonMapConfigObjectForKeyCode('KeyJ'),
				11: buildButtonMapConfigObjectForKeyCode('KeyK'),
				12: buildButtonMapConfigObjectForKeyCode('KeyL'),
				13: buildButtonMapConfigObjectForKeyCode('Semicolon'),
			},
		];

		this.streamDeck.addEventListener('keydown', (e) => {
			const buttonId = e.detail.buttonId;
			const buttonConfig = buttonMap[activePage][buttonId] ?? false;
			
			if (buttonConfig && buttonConfig.action) {
				buttonConfig.action(e);
			}
		});
		renderButtonPage(activePage);

	}

	render() {
		this.targetNode.innerHTML = `
			<ul class="drumpad">
				${Object.entries(this.fragments)
					.map(([keyCode, fragment]) => {
						return `
						<li data-keycode="${keyCode}" data-label="${fragment.label}">
							<audio controls="controls" id="${keyCode}" src=${fragment.url} preload="true" style="--color:${fragment.color ?? ''}"></audio>
						</li>
					`;
					})
					.join("")}
			</ul>
		`;
	}
}

export { DrumPad };