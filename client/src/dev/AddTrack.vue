<script setup>
async function postTrack(e) {
	const form = e.target

	const formData = new FormData(form)
	const data = {}
	formData.forEach(function (value, key) {
		data[key] = value
	})

	const url = new URL("http://localhost:3000/add-track")

	let response = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json; charset=utf-8",
		},
		body: JSON.stringify(data),
	})

	let result = await response.json()

	console.log(result)
}
</script>

<template>
	<form @submit.prevent="postTrack">
		<p>Картинка трека:</p>
		<input
			type="file"
			name="imageUrl"
			value=""
		/>
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
</template>

<style>
input {
	display: block;
	margin-block: 5px;
	border: solid #000 1px;
}
</style>
