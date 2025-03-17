import { cardIds } from './cardIds';
import { onKeyPress } from './onKeyPress';
import { addModifierClass } from './addModifierClass';
import { dontSplitOnEnter } from './dontSplitOnEnter';
import { formatCard } from './formatCard';
import { selectAll } from './selectAll';
import { splitOnModEnter } from './splitOnModEnter';
import { decorateScreenplay } from './decorateScreenplay';
import { setSelectedCard } from './setSelectedCard';
import { onEditorFocus } from './onEditorFocus';
import { notesDecorations } from './notesDecorations';
import { changeTracker } from './changeTracker';
import { collapsedGridClass } from './collapsedGridClass';

export const extensions = [
	cardIds,
	// collapsedGridClass,
	// onKeyPress,
	addModifierClass,
	formatCard,
	setSelectedCard,
	dontSplitOnEnter,
	// decorateScreenplay,
	selectAll,
	splitOnModEnter,
	// onEditorFocus,
	notesDecorations,
	changeTracker
];
