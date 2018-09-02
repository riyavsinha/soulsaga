function binfind(o, lst, field) {
  if (field) {
    lst = lst.map(c => c[field]);
  }
  var low = 0,
		high = lst.length;

	while (low < high) {
		var mid = low + high >>> 1;
		if (lst[mid] < o) low = mid + 1;
		else high = mid;
	}
	return low;
};

export default binfind;