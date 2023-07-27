
function useUpdatableObject(hook, ...props) {
	const [value, setValue] = hook(...props);
	const updateValue = new_value => setValue(Object.assign(Object.assign({}, value), new_value));
	return [value, setValue, updateValue];
}

export { useUpdatableObject };
