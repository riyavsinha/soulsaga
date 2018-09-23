function ab2str (buffer, encoding) {
	if (encoding == null) encoding = 'utf8'

	return Buffer.from(buffer).toString(encoding);
}

function str2ab (str) {
	var array = new Uint8Array(str.length);
	for(var i = 0; i < str.length; i++) {
		array[i] = str.charCodeAt(i);
	}
	return array.buffer
}

export {ab2str, str2ab};