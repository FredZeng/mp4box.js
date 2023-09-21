/**
 * size - 4字节
 * type - 4字节（'tkhd'）
 * version - 1字节
 * flags - 3字节
 * creation_time - 4字节
 * modification_time - 4字节
 * track_id - 4字节
 * reserved - 4字节
 * duration - 4字节
 * reserved - 8字节
 * layer - 2字节
 * alternate_group - 2字节
 * volume - 2字节
 * reserved - 2字节
 * matrix - 36字节
 * width - 4字节
 * height - 4字节
 */
BoxParser.createFullBoxCtor("tkhd", function(stream) {
	if (this.version == 1) {
		this.creation_time = stream.readUint64();
		this.modification_time = stream.readUint64();
		this.track_id = stream.readUint32();
		stream.readUint32();
		this.duration = stream.readUint64();
	} else {
		this.creation_time = stream.readUint32();
		this.modification_time = stream.readUint32();
		this.track_id = stream.readUint32();
		stream.readUint32();
		this.duration = stream.readUint32();
	}
	stream.readUint32Array(2);
	this.layer = stream.readInt16();
	this.alternate_group = stream.readInt16();
	this.volume = stream.readInt16()>>8;
	stream.readUint16();
	this.matrix = stream.readInt32Array(9);
	this.width = stream.readUint32();
	this.height = stream.readUint32();
});

