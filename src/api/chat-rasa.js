
import api from ".";

class RESTChatConnection extends EventTarget {
	#endpoint
	constructor(endpoint) {
		super();
		this.#endpoint = endpoint;
		if (this.#endpoint === undefined)
			this.#endpoint = "/chat";
	}

	get endpoint() {
		return this.#endpoint;
	}

	set endpoint(endpoint) {
		this.#endpoint = endpoint;
		//TODO: Add checks
	}

	get connection_ok() {
		return true;
	}

	#messageReceived(message_data) {
		if (!Array.isArray(message_data) || message_data.length === 0) {
			this.dispatchEvent(new CustomEvent("chat-response", { detail: null }));
			return message_data;
		}

		message_data.forEach(msg => this.dispatchEvent(new CustomEvent("chat-response", { detail: msg })));
		return message_data;
	}

	async sendMessage(message_data) {
		return await api.post(this.#endpoint, message_data)
			.then(res => this.#messageReceived(res.data));
	}
}

class SocketIOChatConnection extends EventTarget {
	#sio;
	constructor(sio) {
		super();
		this.#sio = sio;
		this.#sio.on('message', this.#messageReceived.bind(this));
		this.#sio.on('receipt', this.#receiptMeta.bind(this));
	}

	get sio() {
		return this.#sio;
	}

	get connection_ok() {
		return this.#sio.connected;
	}

	#messageReceived(message_data) {
		this.dispatchEvent(new CustomEvent("chat-response", { detail: message_data }));
	}

	#receiptMeta(data) {
		switch (data.action) {
			case 'typing':
				//Add cases for other actions supported
				this.dispatchEvent(new CustomEvent(data.action, { detail: data }));
				break;
		}
	}

	async sendMessage(message_data) {
		return await this.#sio.send(message_data);
	}
}

export {
	SocketIOChatConnection,
	RESTChatConnection
};
