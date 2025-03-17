import { writable, get } from 'svelte/store';
function createCardStore() {
	const { subscribe, set, update } = writable([]);

	return {
		get: function () {
			return get(_cards);
		},
		subscribe,
		set,
		update,
		addCard: (newCard) =>
			update((cards) => {
				const exists = cards.some((card) => card.id === newCard.id);
				return exists ? cards : [...cards, newCard];
			}),
		removeCard: (id) => update((cards) => cards.filter((card) => card.id !== id)),
		updateCard: (id, newData) =>
			update((cards) => {
				const cardExists = cards.some((card) => card.id === id);
				if (!cardExists) {
					return cards;
				}
				return cards.map((card) => (card.id === id ? { ...card, ...newData } : card));
			}),
		getAll: () => {
			let sortedCards = [];
			subscribe((cards) => {
				sortedCards = [...cards].sort((a, b) => a.index - b.index);
			})();
			return sortedCards;
		},
		getCardById: (id) => {
			let foundCard;
			update((cards) => {
				foundCard = cards.find((card) => card.id === id);
				return cards;
			});
			return foundCard;
		},
		getPositions: () => {
			let positions = [];
			update((cards) => {
				positions = cards.map((card) => card.getPos() + 1);
				return cards;
			});
			return positions;
		},
		updateIndexes: (cardsArray) =>
			update((cards) => {
				return cards.map((card) => {
					const newCard = cardsArray.find((c) => c.id === card.id); // Corrected to search by id
					return newCard ? { ...card, index: newCard.index } : card; // Update index based on the new card data
				});
			}),
		collapseOrExpandAll: (isCollapsed) => {
			_cards.update((cards) => {
				const updatedCards = cards.map((card) => ({
					...card,

					section: {
						...card.section,
						sectionCollapsed: isCollapsed
					}
				}));
				return updatedCards;
			});
		}
	};
}

export const _cards = createCardStore();
// window._cards = _cards;
