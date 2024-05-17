function compareArrays(arr1, arr2) {
	return arr1.length === arr2.length && arr1.every((item, index) => item === arr2[index]);
}

function getUsersNamesInAgeRange(users, gender) {
	let result = users.filter(user => user.gender === gender).map(user => user.age);
	if (result.length === 0) {
		return 0;
	}
	return result.reduce((acc, item) => acc + item, 0) / result.length;
}