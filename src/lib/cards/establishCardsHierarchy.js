import { debounce, _cards, logTimer } from '$lib';

const establishCardsHierarchyDebounced = debounce(() => {
	establishCardsHierarchy();
}, 200);

export function establishCardsHierarchy() {
	logTimer.start('establishCardsHierarchy');
	const cards = _cards.getAll();

	const updatedCards = cards.map((card) => ({
		...card,
		dependencyInfo: {
			parentId: null,
			parentIds: [],
			parentCardDepth: null,
			hasCollapsedParent: false,
			numberOfChildren: 0,
			descendants: [] // Initialize as an empty array
		}
	}));

	// Track sections in order of appearance, with their depths
	const sectionStack = [];

	// First pass: establish parent-child relationships
	updatedCards.forEach((card) => {
		const currentDepth = card.section.sectionDepth;

		if (card.section.isSection) {
			// Remove any sections from the stack that are at the same or deeper level
			while (
				sectionStack.length > 0 &&
				sectionStack[sectionStack.length - 1].depth >= currentDepth
			) {
				sectionStack.pop();
			}

			// Add current section to stack
			sectionStack.push({
				section: card,
				depth: currentDepth
			});

			// If there are parent sections, establish relationships
			if (sectionStack.length > 1) {
				const parentSection = sectionStack[sectionStack.length - 2].section;
				card.dependencyInfo.parentId = parentSection.id;
				card.dependencyInfo.parentCardDepth = parentSection.section.sectionDepth;

				// Collect all parent IDs from the stack
				card.dependencyInfo.parentIds = sectionStack.slice(0, -1).map((item) => item.section.id);

				// Check if any parent is collapsed
				card.dependencyInfo.hasCollapsedParent = sectionStack
					.slice(0, -1)
					.some((item) => item.section.section.sectionCollapsed);
			}
		} else {
			// For non-section cards, find the most recent section as parent
			if (sectionStack.length > 0) {
				const parentSection = sectionStack[sectionStack.length - 1].section;
				card.dependencyInfo.parentId = parentSection.id;
				card.dependencyInfo.parentCardDepth = parentSection.section.sectionDepth;

				// All sections in the stack are parents
				card.dependencyInfo.parentIds = sectionStack.map((item) => item.section.id);

				// Check if any parent section is collapsed
				card.dependencyInfo.hasCollapsedParent = sectionStack.some(
					(item) => item.section.section.sectionCollapsed
				);
			}
		}
	});

	// Second pass: count all descendants and gather their full card objects
	updatedCards.forEach((card) => {
		if (card.dependencyInfo.parentIds.length > 0) {
			card.dependencyInfo.parentIds.forEach((parentId) => {
				const parentIndex = updatedCards.findIndex((c) => c.id === parentId);
				if (parentIndex !== -1) {
					const parentCard = updatedCards[parentIndex];
					parentCard.dependencyInfo.numberOfChildren++;

					// Add this entire card object to the parent's descendants
					parentCard.dependencyInfo.descendants.push(card);
				}
			});
		}
	});

	_cards.set(updatedCards);

	logTimer.stop();
}