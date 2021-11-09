function capitalizeWord(word) {
	const capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1);

	return capitalizedWord;
}

export default capitalizeWord;
