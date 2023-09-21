/**
 * size - 4字节
 * type - 4字节（'ftyp'）
 * major_brand - 4字节
 * minor_version - 4字节
 * compatible_brands - n * 4字节
 */
BoxParser.createBoxCtor("ftyp", function(stream) {
	var toparse = this.size - this.hdr_size;
	this.major_brand = stream.readString(4);
	this.minor_version = stream.readUint32();
	toparse -= 8;
	this.compatible_brands = [];
	var i = 0;
	while (toparse>=4) {
		this.compatible_brands[i] = stream.readString(4);
		toparse -= 4;
		i++;
	}
});

