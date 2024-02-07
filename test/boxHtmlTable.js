
function generateBoxTable(box, excluded_fields, additional_props, no_header) {
	var prop;
	var html = '<table>';
	if (!no_header) {
		html += '<thead>';
		html += '<tr>';
		html += '<th>';
		html += 'Property name';
		html += '</th>';
		html += '<th>';
		html += 'Property value';
		html += '</th>';
		html += '</tr>';
		html += '</thead>';
	}
	html += '<tbody>';
	for (prop in box) {
		if (["hdr_size", "boxes", "subBoxNames", "entries", "samples", "references", "items", "item_infos", "extents", "associations", "esd", "descs", "levels", "subsegments", "props"].indexOf(prop) > -1) {
			continue;
		} else if (excluded_fields && excluded_fields.indexOf(prop) > -1) {
			continue;
		} else if (box[prop] instanceof BoxParser.Box) {
			continue;
		} else if (typeof box[prop] === "undefined") {
			continue;
		} else if (typeof box[prop] === "function") {
			continue;
		} else if (box.subBoxNames && box.subBoxNames.indexOf(prop.slice(0,4)) > -1) {
			continue;
		} else {
			html += '<tr>';
			html += '<td><code>';
			html += prop;
			html += '</code></td>';
			html += '<td><code>';
			if (prop === "data") {
				for (var i = 0; i < box[prop].length; i++) {
					var j = box[prop][i];
					var hex = j.toString(16);
					html += (hex.length === 1 ? "0"+hex : hex);
					if (i%4 === 3) html += ' ';
				}
			} else {
				if (box[prop].hasOwnProperty("toString") && typeof box[prop].toString === "function")
					html += box[prop].toString();
				else
					html += box[prop];
			}
			html += '</code></td>';
			html += '</tr>';
		}
	}
	if (additional_props) {
		for (prop in additional_props) {
			html += '<tr>';
			html += '<td><code>';
			html += prop;
			html += '</code></td>';
			html += '<td><code>';
			html += additional_props[prop];
			html += '</code></td>';
			html += '</tr>';
		}
	}
	html += '</tbody>';
	html += '</table>';

	if (!no_header && box.type !== 'mdat' && file.objectIsFile && typeof box.start === 'number' && typeof box.size === 'number') {
		html += '<div id="boxDataDetail" style="font-family: Lucida Console,Lucida Sans Typewriter,monaco,Bitstream Vera Sans Mono,monospace; white-space: pre;"></div>';

		const r = new FileReader();
		let dataDetail = '';
		let line = [];

		function hex2Char(hex) {
			const charCode = parseInt(hex, 16);

			if (charCode < 32 || charCode > 126) {
				return '.';
			}

			return String.fromCharCode(charCode);
		}

		const readBlock = function(start, size) {
			const chunkSize = 1024 * 2;

			const objectToLoad = file.objectToLoad;
			const blob = objectToLoad.slice(start, start + Math.min(chunkSize, size));
			r.onload = function(e) {
				const boxDataDetail = document.getElementById('boxDataDetail');
				if (!boxDataDetail || file.fancytree.activeNode.data.box !== box) {
					dataDetail = '';
					line = [];
					return;
				}

				let data = new Uint8Array(e.target.result);
				for (let i = 0; i < data.length; i++) {
					const hex = data[i].toString(16).toUpperCase();
					line.push(hex.length === 1 ? "0" + hex : hex);

					if (line.length === 16) {
						dataDetail += line.join(' ') + '    ' + line.map(it => hex2Char(it)).join(' ') + '\n';
						line = [];
					}
				}

				boxDataDetail.innerText = dataDetail;
				data = null;

				if (size > chunkSize) {
					readBlock(start + chunkSize, size - chunkSize);
				} else if (line.length > 0) {
					const padding = line.length < 16 ? ' ' + new Array(16 - line.length).fill('  ').join(' ') : '';

					dataDetail += line.join(' ') + padding + '    ' + line.map(it => hex2Char(it)).join(' ') + '\n';

					boxDataDetail.innerText = dataDetail;
					line = [];
				}
			};
			r.readAsArrayBuffer(blob);
		}

		readBlock(box.start, box.size);
	}
	return html;
}
