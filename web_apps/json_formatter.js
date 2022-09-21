window.onload = function() {
	document.getElementById("upload_json").onchange = async (e) => {
		let file = e.currentTarget.files[0];
		if (!file) return;

		document.getElementById("json_file").value = await fetch_text(file);
	}
}

let fetch_text = (file) => {
	return new Promise((resolve) => {
	  let fr = new FileReader();
	  fr.onload = (e) => {
		resolve(e.currentTarget.result);
	  };
	  fr.readAsText(file);
	});
  };

function format_json() {
	let json_file = document.getElementById("json_file")
	let resultbox = document.getElementById("result")
	let iline = document.getElementById("1line")
	let copybtn = document.getElementById("copy_btn")
	let downloadbtn = document.getElementById("download_btn")
	copybtn.value = "コピーする";
	try{
	    let obj2 = jsonlint.parse(json_file.value);
		let error = "問題は検出されませんでした。";
		let obj = JSON.parse(json_file.value)
		document.getElementById("correct").textContent = error;
		if (iline.checked) {
			resultbox.value = JSON.stringify(obj);
		} else {
			resultbox.value = JSON.stringify(obj, null, 2);
		}
		downloadbtn.disabled = false;
		copybtn.disabled = false;
	}
	catch(e){
		let error = "JSONの構文に問題があります!";
		document.getElementById("correct").textContent = error;
		resultbox.value = e.message;
		downloadbtn.disabled = true;
		copybtn.disabled = true;

	}
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
	link.download = "format_json.json";
	link.href = URL.createObjectURL(blob);
	link.click();
	URL.revokeObjectURL(link.href)
}
