<script setup>
const navItems = [
	{
		name: "Все треки",
		link: "/",
	},
	{
		name: "Добавить микс",
		link: "/create-mix",
	},
]
</script>

<template>
	<nav class="header__nav nav">
		<ul class="nav__list">
			<li
				class="nav__item"
				v-for="{ name, link } in navItems"
				:key="name"
			>
				<RouterLink
					:to="link"
					class="nav__link"
				>
					<h2>{{ name }}</h2>
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
	font-weight: 500;
	color: var(--cyan-700);
}

.nav__link:hover {
	color: var(--cyan-500);
	text-decoration: underline;
}

.nav__link.router-link-exact-active {
	font-weight: bold;
	color: var(--cyan-500);
	text-decoration: underline;
}
</style>
