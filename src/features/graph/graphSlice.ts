import {
	createSlice,
	createEntityAdapter,
	PayloadAction,
	EntityId,
	createSelector,
} from "@reduxjs/toolkit";
import {
	Graph,
	GraphElement,
	DataAction,
	LayoutAction,
	GraphArrow,
	ArrowPoint,
	ChangePointAction,
} from "./types";
import { v4 as uuid } from "uuid";
import { mergeData } from "./utils";
import { RootState } from "@src/app/types";

const elementsAdapter = createEntityAdapter<GraphElement>({
	selectId: (el) => el.id,
});

const arrowsAdapter = createEntityAdapter<GraphArrow>({
	selectId: (arrow) => arrow.id,
});

const elements = elementsAdapter.addMany(elementsAdapter.getInitialState(), [
	{
		id: "abc123",
		type: "class",
		data: {
			name: "testClass1",
			attributes: [],
			constructors: [],
			methods: [],
			isFinal: false,
			haveMain: false,
		},
		layout: {
			x: 1300,
			y: 1200,
			width: 220,
			height: 150,
		},
	},
	{
		id: "efg456",
		type: "class",
		data: {
			name: "testClass2",
			attributes: [],
			constructors: [],
			methods: [],
			isFinal: false,
			haveMain: false,
		},
		layout: {
			x: 1600,
			y: 900,
			width: 220,
			height: 150,
		},
	},
]);

const arrows = arrowsAdapter.addMany(arrowsAdapter.getInitialState(), [
	{ id: "myId", from: "abc123", to: "efg456" },
]);

const initialState: Graph = {
	width: 3000,
	height: 2000,
	elements: elements,
	arrows: arrows,
};

const graphSlice = createSlice({
	name: "graph",
	initialState,
	reducers: {
		changeGraph(
			state,
			action: PayloadAction<Partial<Omit<Graph, "elements" | "arrows">>>
		) {
			Object.assign(state, action.payload);
		},

		addElement: {
			prepare(element: Omit<GraphElement, "id">) {
				return {
					payload: {
						...element,
						id: uuid(),
					},
				};
			},
			reducer(state, action: PayloadAction<GraphElement>) {
				elementsAdapter.addOne(state.elements, action.payload);
			},
		},

		deleteElement(state, action: PayloadAction<EntityId>) {
			elementsAdapter.removeOne(state.elements, action.payload);
		},

		updateData(state, action: DataAction) {
			const { id, data } = action.payload;
			const element = state.elements.entities[id];

			if (!element) return;

			elementsAdapter.updateOne(state.elements, {
				id,
				changes: { data: mergeData(element.data, data) },
			});
		},

		updateLayout(state, action: LayoutAction) {
			const { id, layout } = action.payload;
			const element = state.elements.entities[id];

			if (!element) return;

			elementsAdapter.updateOne(state.elements, {
				id,
				changes: { layout: { ...element.layout, ...layout } },
			});
		},

		addArrow: {
			prepare(from: ArrowPoint, to: ArrowPoint) {
				return {
					payload: {
						id: uuid(),
						from,
						to,
					},
				};
			},
			reducer(state, action: PayloadAction<GraphArrow>) {
				arrowsAdapter.addOne(state.arrows, action.payload);
			},
		},

		deleteArrow(state, action: PayloadAction<EntityId>) {
			arrowsAdapter.removeOne(state.arrows, action.payload);
		},

		changePoint(state, action: ChangePointAction) {
			const { id, point, coords } = action.payload;
			const arrow = state.arrows.entities[id];

			if (!arrow) return;

			arrowsAdapter.updateOne(state.arrows, {
				id,
				changes: { [point]: coords },
			});
		},
	},
});

// actions
export const {
	changeGraph,
	addElement,
	deleteElement,
	updateData,
	updateLayout,
	addArrow,
	deleteArrow,
	changePoint,
} = graphSlice.actions;

// selectors
export const {
	selectById: selectElementById,
	selectIds: selectElementsIds,
	selectAll: selectElements,
} = elementsAdapter.getSelectors<RootState>((state) => state.graph.elements);

export const {
	selectById: selectArrowById,
	selectIds: selectArrowsIds,
	selectAll: selectArrows,
} = arrowsAdapter.getSelectors<RootState>((state) => state.graph.arrows);

export const selectElementCoords = createSelector(
	selectElementById,
	(element) =>
		element
			? {
				x: element.layout.x + 110,
				y: element.layout.y + 75,
			}
			: undefined
);

export const selectArrow = createSelector(
	selectArrowById,
	(state: RootState, id: EntityId) => {
		const arrow = selectArrowById(state, id);
		if (typeof arrow?.from === "string" || typeof arrow?.from === "number") {
			return selectElementCoords(state, arrow.from);
		}
		return arrow?.from;
	},
	(state: RootState, id: EntityId) => {
		const arrow = selectArrowById(state, id);
		if (typeof arrow?.to === "string" || typeof arrow?.to === "number") {
			return selectElementCoords(state, arrow.to);
		}
		return arrow?.to;
	},
	(arrow, from, to) =>
		!arrow || !from || !to ? undefined : { ...arrow, from, to }
);

export const selectGraph = createSelector(
	(state: RootState) => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { elements, arrows, ...graph } = state.graph;
		return graph;
	},
	selectElementsIds,
	selectArrowsIds,
	(graph, elements, arrows) => ({ ...graph, elements, arrows })
);

// reducer
export default graphSlice.reducer;
