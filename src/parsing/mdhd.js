/**
 * size - 4字节
 * type - 4字节（'mdhd'）
 * version - 1字节
 * flags - 3字节
 * creation_time - 4/8字节
 * modification_time - 4/8字节
 * timescale - 4字节
 * duration - 4/8字节
 * language - 2字节
 * pre_defined - 2字节
 */
BoxParser.createFullBoxCtor("mdhd", function(stream) {
	if (this.version == 1) {
		this.creation_time = stream.readUint64();
		this.modification_time = stream.readUint64();
		this.timescale = stream.readUint32();
		this.duration = stream.readUint64();
	} else {
		this.creation_time = stream.readUint32();
		this.modification_time = stream.readUint32();
		this.timescale = stream.readUint32();
		this.duration = stream.readUint32();
	}
	this.parseLanguage(stream);
	stream.readUint16();
});

