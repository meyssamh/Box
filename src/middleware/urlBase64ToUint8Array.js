/**
 * Converts a Base64 string to Uint8Array.
 * 
 * @param {String} base64String - public base64 string.
 * @returns {Array} a uint8array.
 */
const urlBase64ToUint8Array = base64String => {
	// eslint-disable-next-line no-magic-numbers
	let padding = '='.repeat((4 - base64String.length % 4) % 4);
	let base64 = (base64String + padding)
		.replace(/-/g, '+')
		.replace(/_/g, '/');

	let rawData = window.atob(base64);
	let outputArray = new Uint8Array(rawData.length);

	for (let i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i);
	}
	return outputArray;
};

export default urlBase64ToUint8Array;