import Strip from 'strip-ansi'
import { default as Ace } from 'ace-builds'

const Output = <HTMLElement> document.querySelector('#output');
const ExecuteButton = <HTMLElement> document.querySelector('#executeButton');

// Setup editor

const editor = Ace.edit("code");
editor.setHighlightActiveLine(false);
editor.setShowPrintMargin(false);

// Handle execution requests

let lockExecution = false;

ExecuteButton.addEventListener('click', (e) => {

    e.preventDefault();

    if (lockExecution) {
        return;
    }

    lockExecution = true;

    ExecuteButton.innerText = '...';
    Output.innerText = '...';

    fetch('/execute', {
        method: 'POST',
        body: editor.getValue()
    })
    .then((response) => {

        let text = '';
        const reader = response.body.getReader()
        const decoder = new TextDecoder();

        function readChunk() {
            return reader.read().then(appendChunks);
        }

        function appendChunks(result) {
            var chunk = decoder.decode(result.value || new Uint8Array(0), { stream: !result.done });
            text += chunk;

            Output.innerText = Strip(text).trim();
            if (result.done) {
                return text;
            } else {
                return readChunk();
            }
        }

        return readChunk();
    })
    .then((text) => {

        ExecuteButton.innerText = 'Execute';
        lockExecution = false;
    });
});
