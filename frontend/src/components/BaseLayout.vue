<script setup>
import { Return } from "@icon-park/vue-next"
import { ref } from "vue"
import { useRouter } from "vue-router"

const appHeight = document.querySelector("#app").getBoundingClientRect().height
const headerHeight = document
	.querySelector(".header")
	.getBoundingClientRect().height
const elementHeight = ref(appHeight - headerHeight - 48 * 2 + "px")

const router = useRouter()
const prevLink = ref(router.options.history.state.back)
</script>

<template>
	<article class="container">
		<a
			class="track-info__return-link"
			:href="prevLink"
			@click.prevent="$router.back()"
		>
			<Return
				class="track-info__return-icon"
				theme="outline"
				size="24"
			/>
		</a>
		<slot />
	</article>
</template>

<style scoped>
.container {
	position: relative;
	width: 1200px;
	height: v-bind("elementHeight");
	margin: 48px auto;
	border-inline: solid 1px var(--gray-700);
}

.track-info__return-link {
	position: absolute;
	top: 0;
	left: 64px;
	width: fit-content;
	padding: 10px;
	margin: -10px 0 -10px -10px;
	line-height: 0;
}

.track-info__return-icon {
	color: var(--cyan-500);
}
</style>
