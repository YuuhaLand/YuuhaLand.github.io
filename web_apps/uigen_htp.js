function convert() {
	let name = document.getElementById("name").value
	let honbun = document.getElementById("honbun").value
	let resultbox = document.getElementById("result")
	let copybtn = document.getElementById("copy_btn")
	let downloadbtn = document.getElementById("download_btn")
	copybtn.value = "コピーする";

	let resultpanel = `{\n  "${name.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\t/g, '\\t')}": {\n    "type": "stack_panel",\n    "size": [ "100%", "100%c" ],\n    "controls": [\n`

	if (name === '') {
		window.alert('パネル名が空欄です。\nパネル名には分かりやすい名前を入力してください。')
		return;
	}

	for (let i = 0; i < honbun.split('\n').length; i++) {
		console.log(i)
		let currentgyou = honbun.split(/\r\n|\r|\n/)[i].replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\t/g, '\\t')
		if (i > 0) resultpanel = resultpanel + ',\n'
		if (currentgyou.startsWith('h>')) {
			resultpanel = resultpanel + `      { "howtoplay_${i.toString()}@how_to_play_common.header": {"$text": "${currentgyou.replace('h>', '')}"}}`
			continue
		}

		if (currentgyou.startsWith('i>')) {
			resultpanel = resultpanel + `      { "howtoplay_${i.toString()}@how_to_play_common.image": {"texture": "${currentgyou.replace('i>', '')}"}}`
			continue
		}

		//HSPで作ってたときのやつと互換性を維持するためのやつ
		if (currentgyou.startsWith('htp:h>')) {
			resultpanel = resultpanel + `      { "howtoplay_${i.toString()}@how_to_play_common.header": {"$text": "${currentgyou.replace('htp:h>', '')}"}}`
			continue
		}

		if (currentgyou.startsWith('htp:i>')) {
			resultpanel = resultpanel + `      { "howtoplay_${i.toString()}@how_to_play_common.image": {"texture": "${currentgyou.replace('htp:i>', '')}"}}`
			continue
		}

		resultpanel = resultpanel + `      { "howtoplay_${i.toString()}@how_to_play_common.paragraph": {"$text": "${currentgyou}"}}`
	}
	resultpanel = resultpanel + '\n    ]\n  }\n}'
	resultbox.value = resultpanel
	downloadbtn.disabled = false;
	copybtn.disabled = false;
}

function copy_to_clip() {
	let resultbox = document.getElementById("result")
	let copybtn = document.getElementById("copy_btn")
	if (navigator.clipboard) {
		navigator.clipboard.writeText(resultbox.value)
		copybtn.value = "コピーしました!";
	} else {
		alert("大変申し訳ありませんが、お使いのブラウザはクリップボードにコピーに対応しておりません。\nResult欄から手動でコピーしてください。");
	}
}

function download_file() {
	let content = document.getElementById("result").value;
	let blob = new Blob([ content ], { "type": "text/plain" });
	let link = document.createElement('a');
	link.download = "converted_ui.json";
	link.href = URL.createObjectURL(blob);
	link.click();
	URL.revokeObjectURL(link.href)
}