let sampleServerSystem = server.registerSystem(0, 0);

// void start()
sampleSystem.initialize = function() {
	//register event data, register components, register queries, listen for events
	this.listenForEvent("minecraft:player_attacked_entity", function(eventData) {
		this.log("bruh");
	});
};


//update 20 times a sec
sampleSystem.update = function() {
	//Update all the things
};


//on exit
sampleSystem.shutdown = function() {
	//Cleanup script only things
};

systemClient.log = function (...items) {
	// Convert every parameter into a legible string and collect them into an array.
	const toString = (item) => {
		switch (Object.prototype.toString.call(item)) {
			case '[object Undefined]':
				return 'undefined'
			case '[object Null]':
				return 'null'
			case '[object String]':
				return `"${item}"`
			case '[object Array]':
				const array = item.map(toString)
				return `[${array.join(', ')}]`
			case '[object Object]':
				const object = Object.keys(item).map(
					(key) => `${key}: ${toString(item[key])}`
				)
				return `{${object.join(', ')}}`
			case '[object Function]':
				return item.toString()
			default:
				return item
		}
	}

	// Join the string array items into a single string and print it to the world's chat.
	const chatEvent = this.createEventData('minecraft:display_chat_event')
	chatEvent.data.message = items.map(toString).join(' ')
	this.broadcastEvent('minecraft:display_chat_event', chatEvent)
}
