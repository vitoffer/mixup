<script setup>
const navItems = [
	{
		name: "All tracks",
		isAccessible: true,
	},
	{
		name: "Authors",
		isAccessible: false,
	},
	{
		name: "Add track",
		isAccessible: false,
	},
]

function generateStyles(isAccessible) {
	if (isAccessible) {
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
				v-for="{ name, isAccessible } in navItems"
				:key="name"
				:style="generateStyles(isAccessible)"
			>
				<a
					href="/"
					class="nav__link"
					:class="isAccessible ? '' : 'hover-not-allowed'"
				>
					{{ name }}
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
</style>
