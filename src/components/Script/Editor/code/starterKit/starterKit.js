import { Extension } from '@tiptap/core';
import { Bold } from './bold';
import { Dropcursor } from '@tiptap/extension-dropcursor';
import { Gapcursor } from '@tiptap/extension-gapcursor';
import { HardBreak } from '@tiptap/extension-hard-break';
import { Italic } from './italic';
import { Text } from '@tiptap/extension-text';

const StarterKit = Extension.create({
	name: 'starterKit',
	addExtensions() {
		return [Bold, Dropcursor, Gapcursor, Italic, Text];
	}
});

export { StarterKit, StarterKit as default };
