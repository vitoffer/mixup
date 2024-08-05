<script setup>
const navItems = [
	{
		name: "Все треки",
		isEnabled: true,
	},
	{
		name: "Авторы",
		isEnabled: false,
	},
	{
		name: "Добавить трек",
		isEnabled: false,
	},
]

function generateStyles(isEnabled) {
	if (isEnabled) {
		return {
			color: "var(--cyan-500)",
			textDecoration: "underline",
		}
	}
	return {
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
				v-for="{ name, isEnabled } in navItems"
				:key="name"
			>
				<a
					href="/"
					class="nav__link"
					:class="isEnabled ? '' : 'hover-not-allowed'"
					:style="[generateStyles(isEnabled), { position: 'relative' }]"
				>
					{{ name }}
					<div
						class="tooltip"
						v-if="!isEnabled"
					>
						В разработке
					</div>
				</a>
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
	bottom: 100%; /* At the top of the tooltip */
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
