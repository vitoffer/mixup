<script setup>


async function postTrack(e) {
	const form = e.target

	const url = new URL("http://localhost:3000/add-track")

	let response = await fetch(url, {
		method: "POST",
		body: new FormData(form),
	})

	let result = await response.json()

	console.log(result);

	form.reset()
}
</script>

<template>
	<div class="form-wrapper">
		<form @submit.prevent="postTrack">
			<h1 style="font-size: 24px">Добавить трек</h1>
			<label class="custom-file-upload">
    		<input type="file"/>
    		Картинка трека
			</label>
			<input
				type="text"
				placeholder="Название"
				name="title"
			/>
			<input
				type="text"
				placeholder="Автор"
				name="author"
			/>
			<input
				type="text"
				placeholder="Трек внутри 1"
				name="track1"
			/>
			<input
				type="text"
				placeholder="Трек внутри 2"
				name="track2"
			/>
			<input
				type="text"
				placeholder="Ссылка на ютуб"
				name="youtube"
			/>
			<input
				type="text"
				placeholder="Ссылка на яндекс музыку"
				name="yandex"
			/>
			<input
				type="text"
				placeholder="Ссылка на вк музыку"
				name="vk"
			/>
			<input
				type="submit"
				value="OK"
			/>
	</form>
</div>
</template>

<style>
.form-wrapper {
	width: 100%;
	min-height: 100vh;
	background-color: var(--gray);
	padding-top: 300px;
}

form {
	margin: auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10px;
	color: var(--yellow);
}

input[type="file"] {
    display: none;
}



input, .custom-file-upload {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 16px;
	border-radius: 10px;
	background-color: var(--light-gray);
	padding: 4px 20px;
	font-size: 18px;
	color: var(--yellow);
}

.custom-file-upload {
	margin-top: 20px;
	padding: 8px 20px;
}

input::placeholder,
.custom-file-upload {
	color: color-mix(in srgb, var(--yellow) 60%, transparent);
}

input:not([type="submit"]) {
	min-width: 300px
}

input[type="submit"] {
	width: 100px
}


</style>
