<script setup>
const navItems = [
	{
		name: "Все треки",
		link: "/",
		isEnabled: true,
	},
	{
		name: "Кураторы",
		link: "/404",

		isEnabled: false,
	},
	{
		name: "Добавить трек",
		link: "/404",
		isEnabled: false,
	},
]

function generateStyles(isEnabled) {
	if (isEnabled) {
		return {
			fontWeight: "bold",
			color: "var(--cyan-500)",
			textDecoration: "underline",
		}
	}
	return {
		fontWeight: 500,
		color: "var(--cyan-700)",
		textDecoration: "line-through",
	}
}
</script>

<template>
	<nav class="header__nav nav">
		<ul class="nav__list">
			<li
				class="nav__item"
				v-for="{ name, link, isEnabled } in navItems"
				:key="name"
			>
				<RouterLink
					:to="link"
					class="nav__link"
					:class="isEnabled ? '' : 'hover-not-allowed'"
					:style="[generateStyles(isEnabled), { position: 'relative' }]"
				>
					<h2>{{ name }}</h2>
					<div
						class="tooltip"
						v-if="!isEnabled"
					>
						В разработке
					</div>
				</RouterLink>
			</li>
		</ul>
	</nav>
</template>

<style scoped>
.header__nav {
	position: absolute;
	top: 50%;
	left: 50%;
	translate: -50% -50%;
}
.nav__list {
	display: flex;
	gap: 50px;
}

.nav__item {
	font-size: 1.125rem;
	line-height: 1.5625rem;
}

.nav__link {
	line-height: 25px;
	padding-block: 8px;
}

.hover-not-allowed:hover {
	cursor: not-allowed;
}

.tooltip {
	position: absolute;
	top: 90%;
	left: 50%;
	translate: -50% 0;
	z-index: 1;
	opacity: 0;

	width: 130px;

	padding: 5px;
	background-color: var(--gray-700);
	border-radius: 10px;
	color: var(--yellow-700);
	text-align: center;
	transition: 200ms;
}

.tooltip::after {
	content: " ";
	position: absolute;
	bottom: 100%;
	left: 50%;
	translate: 0 1px;
	z-index: 2;
	margin-left: -5px;
	border-width: 5px;

	border-style: solid;
	border-color: transparent transparent var(--gray-700) transparent;
}

.nav__link:hover .tooltip {
	opacity: 1;
}
</style>
