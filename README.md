# WebHID Demo: Elgato Stream Deck Daft Punk Soundboard

Daft Punk Soundboard, with ability to connect a [Elgato Stream Deck](https://www.elgato.com/en/gaming/stream-deck) using [WebHID](https://web.dev/hid/) to control the soundboard.

## Demo

[https://webhid-elgato-stream-deck-daft-punk-soundboard.netlify.app/](https://webhid-elgato-stream-deck-daft-punk-soundboard.netlify.app/)

## Video

If you don't own an Elgato Stream, here's a recording of what it looks like

[![Recording of demo](https://img.youtube.com/vi/BcRyAlT5xtg/0.jpg)](https://www.youtube.com/watch?v=BcRyAlT5xtg)

## Usage

### Manipulating the Soundboard

Click the buttons to trigger a sound, or use one of the keyboard shortcuts.

- Keys `1` and `2`: Switch between the pages
- Keys `QWER` and `ASDF`: Play sounds from first page
- Keys `UIOP` and `JKL,`: Play sounds from second page

_💡 Note that the sounds are paged and that only sounds from the currently active page will play. Pressing `U` when Page 1 is active won't work for example; you need to activate Page 2 first!_

### Linking the Elgato Stream Deck

1. Plug in the Stream Deck device into your computer.
1. Make sure the native Stream Deck App is not running. The buttons should show the Elgato Logo.
1. Enable WebHID by enabling ”Experimental Web Platform Features” through <code>chrome://flags/</code>.
1. Open the demo and click the “Connect Stream Deck” button.
1. In the device picker, choose your Stream Deck device and click “Connect”.

_💡 Linking the Elgato Stream Deck is a one-time step. Once connected the browser will remember the connection._

## Known Issues

- The visual feedback when pressing a button does not play nice with multiple successive presses on the same button. This because the CSS used for it is already applied after the first press, and layout won't be triggered after that.
- For the sounds to play you need to have interacted with the page first. If you don't hear any sounds when pressing the Elgato Stream Deck buttons, first click _(using your mouse)_ somewhere on the soundboard and then retry.

## Credits

- Bramus Van Damme <em>([https://www.bram.us/](https://www.bram.us/) / [@bramus](https://www.twitter.com/bramus))</em>
- [All Contributors](../../contributors)

The Stream Deck connection was borrowed from [this project](https://github.com/petele/StreamDeck-Meet/) by [Pete LePage](https://twitter.com/petele)

Audio samples by Daft Punk, no copyright infringement intended.

## License

The MIT License (MIT). Please see [License File](LICENSE) for more information.

## Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information on what has changed recently.