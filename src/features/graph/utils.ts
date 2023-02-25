function isObject(el: unknown): el is object {
	return typeof el === "object" && !Array.isArray(el);
}

export function mergeData(elData: unknown, data: unknown): unknown {
	if (Array.isArray(elData) && Array.isArray(data)) {
		return [...elData, ...data];
	}
	if (isObject(elData) && isObject(data)) {
		return { ...elData, ...data };
	}

	return data;
}
