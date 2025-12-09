import { GOOGLE_CLOUD_URI } from "../config/cloud.storage";

export const getCloudMedia = async (fileName: string) => {
	const fileURI = fileName
		? GOOGLE_CLOUD_URI + fileName
		: "https://cdn-icons-png.flaticon.com/512/482/482432.png";

	try {
		const fileFetch = await fetch(fileURI);
		const file = await fileFetch.blob();
		return file;
	} catch (err) {
		console.error("Couldn't fetch: " + err);
		return;
	}
};
