<script setup>
async function postTrack(e) {
	const form = e.target

	const url = new URL("http://localhost:3000/add-track")

	let response = await fetch(url, {
		method: "POST",
		body: new FormData(form),
	})

	let result = await response.json()

	form.reset()
}
</script>

<template>
	<form @submit.prevent="postTrack">
		<label>
			Картинка трека:
			<input
				type="file"
				name="image"
			/>
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
</template>

<style>
form {
	margin: auto;
	width: 500px;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 5px;
}

label {
	display: flex;
	flex-direction: column;
	align-items: center;
}

input {
	display: block;
	border: solid #000 1px;
	padding: 5px;
}
</style>
