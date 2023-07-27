
import api from ".";

export async function authenticate(payload) {
	return await api.post(
		"/auth/login",
		payload
	);
}
