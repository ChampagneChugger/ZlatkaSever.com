<script lang="ts">
	import { onMount } from "svelte"
	import { enhance } from "$app/forms"
	import { slide } from "svelte/transition"
	import popup from "$lib/stores/popup"
	import type { PageData } from "../../routes/(main)/./$types"
	import { beforeNavigate } from "$app/navigation"
	let otvoreni: boolean = false
	let linksa: boolean = false
	export let navHeight: number
	let body: HTMLBodyElement
	let icon = "mdi:menu"

	export let data: PageData

	onMount(() => {
		body = document.getElementsByTagName("body")[0]
	})

	beforeNavigate(() => {
		otvoreni = false
	})

	$: {
		if (otvoreni) {
			icon = "material-symbols:close"
			body.classList.add("no-scroll")
		} else {
			if (body) {
				icon = "mdi:menu"
				body.classList.remove("no-scroll")
			}
		}
	}

	$: if ($popup) {
		body.classList.add("no-scroll")
	} else {
		if (body) {
			body.classList.remove("no-scroll")
		}
	}
</script>

<nav bind:clientHeight={navHeight}>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<i
		on:click={() => {
			otvoreni = !otvoreni
		}}><iconify-icon {icon} /></i
	>
	<a href="/"><img src="/logo.svg" alt="Logo" /></a>
	<div class="navsocials">
		<a href="https://www.instagram.com/zlatkasever/" rel="noreferrer" target="_blank"
			><i><iconify-icon icon="mdi:instagram" /></i></a
		>
		<a href="https://www.facebook.com/zlatkas1" rel="noreferrer" target="_blank"
			><i><iconify-icon icon="ic:baseline-facebook" /></i></a
		>
	</div>
</nav>
{#if otvoreni}
	<div style:top={navHeight + "px"} class="subnav">
		<form use:enhance action="/" method="POST">
			<i><iconify-icon icon="material-symbols:search-rounded" /></i>
			<input type="text" placeholder="Pretraži objave" />
		</form>
		<!-- svelte-ignore a11y-invalid-attribute -->
		<a href="/">Naslovna</a>
		<button
			on:click={() => {
				linksa = !linksa
			}}
			>Terapije <i
				><iconify-icon icon="material-symbols:expand-more" class:moretransition={linksa} /></i
			>
		</button>
		{#if linksa}
			<div class="alinks" transition:slide>
				<a href="/brzo-transformacijska-terapija">Brzo transformacijska terapija</a>
				<a href="/hipnoterapija">Hipnoterapija</a>
			</div>
		{/if}
		<a href="/blog">Blog</a>
		<a href="/coaching">Coaching</a>
		<a href="/mojamisija">Moja misija</a>
		{#if data.user}
			<a class="navprofil" href="/profile/{data.user.username}">
				<img src={data.user.profile_picture} alt="Profil" />
				<p>{data.user.username}</p>
			</a>
		{/if}
	</div>
{/if}
