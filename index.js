// ���[�U�w��̃t�@�C����ǂݍ��݁A�摜�F���̊֐����Ăяo���B
function read_in() {
	var reader = new FileReader();
	reader.onload = function (e) {
		//�I�����ꂽ�摜��img�v�f�Ƃ��ĕ\������B
		//document.getElementById("read_image").src = e.target.result;
		read_image.src = reader.result
		//�摜�F�����s��
		recognize_image();
	}
	// �摜�t�@�C����data URL�Ƃ��ēǂݍ��ނ悤�Ɏw�����Ă����B
	reader.readAsDataURL(document.getElementById("input_image_file").files[0]);
}


// �摜�F�����s���B
function recognize_image() {

  //���ʏo�͐�̗v�f���擾����B
  var txt_out = document.getElementById("text_of_read_image");
  //������A�A�����Ď��s����Ƃ��̂��߂ɁA�ŏ��ɒ��g���̂Ă�B
  txt_out.innerHTML = "";
  //�w�肳�ꂽ����̃R�[�h���擾����B
  var lang_list = document.getElementById("lang_options");
  var selected_lang = lang_list.options[lang_list.selectedIndex].value;
  console.log(selected_lang + "���I������܂����B");
  
  document.getElementById("msg").textContent = "[�������J�n���܂����B]";

  //�摜�F��
  Tesseract.recognize(
    document.getElementById("read_image").src,
    { 
      lang: selected_lang
    })
  .progress(function(m) {
    document.getElementById("msg").textContent += ">> ";
    //console.log("�r���o��: " + m + "\n");
  })
  .catch(function(e) {
    document.getElementById("msg").textContent += "[�G���[�ł�: " + e + "]";
    console.log("�G���[�ł�: " + e);
  })
  .then(function(result) {
    txt_out.innerHTML = result.text;
  })
  .finally(function(r) {
    document.getElementById("msg").textContent += "[�������I���܂���]\n";
  });
}