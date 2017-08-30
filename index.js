//�t�@�C���̓ǂݍ��݁A�摜�F���̊֐��Ăяo��
function read_in() {
	var reader = new FileReader();
	reader.onload = function (e) {
		//�I�����ꂽ�摜��img�v�f�Ƃ��ĕ\��
		read_image.src = reader.result
		//�摜�F���֐�
		recognize_image();
	}
	// �摜�t�@�C����data URL�Ƃ��ēǂݍ��ނ悤�Ɏw��
	reader.readAsDataURL(document.getElementById("input_image_file").files[0]);
}


//�摜�F��
function recognize_image() {
	//���ʏo�͐�̗v�f���擾
	var txt_out = document.getElementById("text_of_read_image");
	//������A�A�����Ď��s����Ƃ��̂��߂ɁA�ŏ��ɒ��g���̂Ă�
	txt_out.innerHTML = "";
	msg.innerHTML = "";
	//�w�肳�ꂽ����̃R�[�h���擾
	var lang_list = document.getElementById("lang_options");
	var selected_lang = lang_list.options[lang_list.selectedIndex].value;
	console.log(selected_lang + "���I������܂����B");

	var startTime = new Date();
	var starthms = startTime.getHours() + ":" + startTime.getMinutes() + "." + startTime.getSeconds();
	document.getElementById("msg").textContent = "[�����J�n" + starthms + "]\n";

	//�摜�F��
	Tesseract.recognize(document.getElementById("read_image").src, { 
			lang: selected_lang,
		})
		.progress(progressUpdate)
		.catch(function(e) {
			document.getElementById("msg").textContent += "[ERROR: " + e + "]\n";
			console.log("ERROR: " + e);
		})
		.then(function(result) {
	  		txt_out.innerHTML = result.text;
		})
		.finally(function(r) {
			var endTime = new Date();
			var endhms = endTime.getHours() + ":" + endTime.getMinutes() + "." + endTime.getSeconds();
			document.getElementById("msg").textContent += "[�����I��" + endhms + "]\n";
		});
}

//�i���Ǘ�
function progressUpdate(packet){
	var log = document.getElementById('log');

	if(log.firstChild && log.firstChild.status === packet.status){
		if('progress' in packet){
			var progress = log.firstChild.querySelector('progress')
			progress.value = packet.progress
		}
	}else{
		var line = document.createElement('div');
		line.status = packet.status;
		var status = document.createElement('div')
		status.className = 'status'
		status.appendChild(document.createTextNode(packet.status))
		line.appendChild(status)

		if('progress' in packet){
			var progress = document.createElement('progress')
			progress.value = packet.progress
			progress.max = 1
			line.appendChild(progress)
		}


		if(packet.status == 'done'){
			var pre = document.createElement('pre')
			pre.appendChild(document.createTextNode(packet.data.text))
			line.innerHTML = ''
			line.appendChild(pre)

		}

		log.insertBefore(line, log.firstChild)
	}
}