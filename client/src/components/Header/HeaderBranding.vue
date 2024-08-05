<script setup></script>

<template>
	<a
		class="header__branding branding"
		href="/"
	>
		<img
			src="@/assets/images/logo.svg"
			alt="Logo"
			class="branding__logo"
		/>

		<div class="branding__info">
			<h1 class="branding__name">MixUp</h1>
			<p class="branding__description">Remix & Mashup Collection</p>
		</div>
	</a>
</template>

<style scoped>
.header__branding {
	display: flex;
	align-items: center;
	gap: 24px;
	justify-self: flex-start;
}

.branding__logo {
	width: 48px;
	aspect-ratio: 1;
}

.branding__info {
	display: flex;
	flex-direction: column;
	align-items: center;
	font-family: var(--font-carter-one);
}

.branding__name {
	font-size: 1.25rem;
	line-height: 1.875rem;
	color: var(--yellow-900);
}

.branding__description {
	font-size: 0.75rem;
	line-height: 1.125rem;
	color: var(--yellow-800);
}
</style>
