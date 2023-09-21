/**
 * size - 4字节
 * type - 4字节（'elst'）
 * version - 1字节
 * flags - 3字节
 * entry_count - 4字节
 * entries - 12 * entry_count字节
 * 		segment_duration - 4字节
 * 		media_time - 4字节
 * 		media_rate_integer - 2字节
 * 		media_rate_fraction - 2字节
 */
BoxParser.createFullBoxCtor("elst", function(stream) {
	this.entries = [];
	var entry_count = stream.readUint32();
	for (var i = 0; i < entry_count; i++) {
		var entry = {};
		this.entries.push(entry);
		if (this.version === 1) {
			entry.segment_duration = stream.readUint64();
			entry.media_time = stream.readInt64();
		} else {
			entry.segment_duration = stream.readUint32();
			entry.media_time = stream.readInt32();
		}
		entry.media_rate_integer = stream.readInt16();
		entry.media_rate_fraction = stream.readInt16();
	}
});

