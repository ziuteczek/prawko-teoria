import supabase from "../../../utils/supabase";

export default async function redirectToCheckout(
	priceId: string,
	userId: string,
	email: string
) {
	const { data, error } = await supabase.functions.invoke("handle-payment-checkout", {
		body: { priceId, userId, email },
	});

	if (error) {
		console.error("Error creating checkout session:", error);
		return;
	}

	window.location.href = data.url;
}
