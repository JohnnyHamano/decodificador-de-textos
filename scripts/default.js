const text_input = document.getElementById("encryptor-input__textarea");
const text_output = document.getElementById("encryptor-output__text__content");
const text_output_title = document.querySelector("#encryptor-output__text > div > h2");

const text_output_container = document.getElementById("encryptor-output");
const text_output_default = document.getElementById("encryptor-output__default");
const text_output_content = document.getElementById("encryptor-output__text");
const text_output_empty = document.getElementById("encryptor-output__empty");
const text_output_error = document.getElementById("encryptor-output__error");

const btn_encrypt = document.getElementById("btn-criptografar");
const btn_decrypt = document.getElementById("btn-descriptografar");
const btn_copy = document.getElementById("btn-copiar");

const toast = document.getElementById("toast");

const window_height = window.innerHeight;

btn_encrypt.onclick = function() {
	const text = text_input.value;

	if (validate(text)) {
		text_output_title.innerText = "Mensagem criptografada";
		text_output.innerText = encrypt(text);
	}
}

btn_decrypt.onclick = function() {
	const text = text_input.value;

	if (validate(text)) {
		text_output_title.innerText = "Mensagem descriptografada";
		text_output.innerText = decrypt(text);
	}
}

btn_copy.onclick = function() {
	navigator.clipboard.writeText(text_output.innerText).then(() => {
		display_toast("Texto copiado!", 3000);
	});
}

document.body.onclick= function(e) {
	if (e.target.className && e.target.className.indexOf('btn-fechar') != -1) {
		e.target.parentElement.style.display = "none";
	};
}

/* Função para validar textos */
// Exibe ou esconde #encryptor-output__default
window.addEventListener("resize", (e) => {
	text_output_container.dataset.display = e.target.innerHeight < window_height ? "closed" : "open";
});

/* Função para validar textos */
// Valida conteúdo do texto de acordo com as regras pré-estabelecidas
function validate(text)
{
	// RegEx para checar letras maiúsculas e acentuação.
	const rules = text.match(/[A-ZÀ-ÿ]/gm);

	if (window.innerWidth > window.innerHeight) {
		text_output_default.style.display = "none";
	}

	text_output_content.style.display = "none";
	text_output_empty.style.display = "none";
	text_output_error.style.display = "none";

	if (text && !rules)
	{
		text_output_content.style.display = "flex";
		text_output_content.classList.add("Fade-In");
	
		setTimeout(function() {
			text_output_content.classList.remove("Fade-In");
		}, 300);
	
		return true;
	}
	else
	{
		if (!text)
		{
			text_output_empty.style.display = "flex";
			text_output_empty.classList.add("Fade-In");

			setTimeout(function() {
				text_output_empty.classList.remove("Fade-In");
			}, 300);
		}
		else
		{
			text_output_error.style.display = "flex";
			text_output_error.classList.add("Fade-In");

			setTimeout(function() {
				text_output_error.classList.remove("Fade-In");
			}, 300);
		}

		return false;
	}
}

/* Função para criptografar textos */
// Criptografa o texto e o exibe no elemento #encryptor-output__text__content
function encrypt(text)
{
	let temp_text = [];
	let tmp_txt = "";

	for (let i = 0; i < text.length; i++)
	{
		switch(text[i])
		{
			case 'a':
				temp_text[i] = "ai";
				tmp_txt += "ai";
				break;
			case 'e': 
				temp_text[i] = "enter";
				tmp_txt += "enter";
				break;
			case 'i': 
				temp_text[i] = "imes";
				tmp_txt += "imes";
				break;
			case 'o': 
				temp_text[i] = "ober";
				tmp_txt += "ober";
				break;
			case 'u': 
				temp_text[i] = "ufat";
				tmp_txt += "ufat";
				break;
			default: 
				temp_text[i] = text[i];
				tmp_txt += text[i];
				break;
		}
	}

	return temp_text.join('');
}

/* Função para descriptografar textos */
// Descriptografa o texto e o exibe no elemento #encryptor-output__text__content
function decrypt(text)
{
	text = text.replace(/ai/g, 'a');
	text = text.replace(/enter/g, 'e');
	text = text.replace(/imes/g, 'i');
	text = text.replace(/ober/g, 'o');
	text = text.replace(/ufat/g, 'u');

	return text;
}

// Função para exibir notificação toast 
/* @message:  Texto da mensagem toast.
// @duration: Duração da notificação em milisegundos
*/
function display_toast(message, duration)
{
	toast.innerText = message;
	toast.style.display = "block";

	toast.classList.add("show");
	setTimeout(function() {
		toast.classList.remove("show");
	}, duration);
}