// this signs-up this script to run on the server-side of the Minecraft Bedrock Edition engine
const systemServer = server.registerSystem(0, 0)

// the server runs this as soon as the scripts are all fully loaded
systemServer.initialize = function () {
	this.listenForEvent("minecraft:entity_acquired_item", (eventData) => this.onItem(eventData));

	// turn on logging of information, warnings, and errors

	var scriptLoggerConfig = this.createEventData("minecraft:script_logger_config");
    scriptLoggerConfig.data.log_errors = true;
    scriptLoggerConfig.data.log_information = true;
    scriptLoggerConfig.data.log_warnings = true;
    this.broadcastEvent("minecraft:script_logger_config", scriptLoggerConfig);

	// register event data, register components, register queries, listen for events, . . .

}

systemServer.onItem = function(eventData) {
	let entity = this.createEntity('entity', "minecraft:creeper");

	let component = this.getComponent(entity, "minecraft:health");

	//let expl = this.createComponent(entity, "minecraft:scale");
	let damageSensorComponent = systemServer.getComponent(entity, "minecraft:damage_sensor");
	damageSensorComponent.data[0].on_damage = { event:"minecraft:start_exploding", filters:[{test:"has_component", operator:"==", value:"minecraft:breathable"}] };
	systemServer.applyComponentChanges(entity, damageSensorComponent);
	//var comp1 = this.createComponent(entity, "minecraft:explode");

	//this.applyComponentChanges(entity, comp1);

};
  

// the server runs this update function 20 times per second
systemServer.update = function () {
	// print hello world to the world's chat once per second

	// update other stuff . . .
}

// the server only runs this when the world is shutting down
systemServer.shutdown = function () {
	// clean up stuff . . .
}

// This is just a helper function that simplifies logging data to the console.
systemServer.log = function (...items) {
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