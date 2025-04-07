import { PUBLIC_PDF } from '$lib/env.js'

import { textParsers, _editor, _app } from '$lib';

export const exportAsPdf = async () => {
	const title = _app.get().script?.title;
	const filename = title ? title.replace(/\s+/g, '_').toLowerCase() : 'script';

	const html = _editor.get().getHTML();

	const textWithSpans = textParsers.domParser(html);
	let text = textParsers.HTMLToMarkdown(textWithSpans).trim();

	if (!text) return;

	const options = {
		embolden_scene_headers: true,
		show_page_numbers: true,
		split_dialogue: true,
		print_title_page: false,
		print_profile: 'a4',
		double_space_between_scenes: false,
		print_sections: false,
		print_synopsis: false,
		print_actions: true,
		print_headers: true,
		print_dialogues: true,
		number_sections: false,
		use_dual_dialogue: true,
		print_notes: false,
		print_header: '',
		print_footer: '',
		print_watermark: '',
		scenes_numbers: 'none',
		each_scene_on_new_page: false
	};

	if (text.startsWith('Title')) {
		options.print_title_page = true;
	}

	try {
		const response = await fetch(PUBLIC_PDF, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ text, options })
		});

		if (!response.ok) {
			throw new Error(`Server error: ${response.statusText}`);
		}

		const blob = await response.blob(); // Get the PDF as a Blob
		const url = URL.createObjectURL(blob);

		// Set the filename to the original with .pdf extension
		const pdfFilename = `${filename.replace(/\.[^/.]+$/, '')}.pdf`;

		// Trigger a download
		const link = document.createElement('a');
		link.href = url;
		link.download = pdfFilename;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	} catch (error) {
		console.error('Error:', error.message);
	}
};
