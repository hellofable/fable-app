import { _app, _script } from '$lib';
import { formatAllCardNodes } from './formatCard/';
import { convertTextToHtmlCardsOnly, createNested } from './parseScript';
import { createCards } from './createCards';

export async function onEditorStart(editor) {
	// first see if we have and text or json to import
	await checkForImport();
	formatAllCardNodes();
	createCards();
}

async function checkForImport() {
	const script = _script.get();

	if (!script) return;
	if (script?.import) {
		const startingHtml = convertTextToHtmlCardsOnly(script.import);
		editor.commands.setContent(startingHtml);
		pb.db.scripts.update(script.id, { import: '' });
		createNested();
	} else {
		// console.log('not importing text');
	}

	if (script.importJson) {
		console.log('importing json...', script.importJson);
		editor.commands.setContent(script.importJson.content);
		pb.db.scripts.update(script.id, { importJson: '' });


	} else {
		// console.log('not importing json');
	}
}
