export default function maxStrokeLength(stroke: string, length: number) {
	const longValid = stroke?.split('').length >= length;
	if(longValid) {
		return stroke.split('').splice(0, length).join('').concat("...");
	} else return stroke;
}