<script lang="ts">
	import { onMount } from "svelte"
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
		linksa = false
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

	let search: string

	async function pretraga() {
		const response = await fetch("/api/search", {
			method: "POST",
			body: JSON.stringify(search)
		})

		let { data } = await response.json()

		let searchResults = JSON.parse(data)

		return searchResults
	}

	let rezultat: any

	$: if (search) {
		rezultat = pretraga()
	} else {
		rezultat = null
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
		<form on:submit|preventDefault={pretraga}>
			<i><iconify-icon icon="material-symbols:search-rounded" /></i>
			<input bind:value={search} type="text" placeholder="Pretraži objave" />
		</form>
		<!-- svelte-ignore a11y-invalid-attribute -->
		{#if search}
			{#await rezultat then rezultati}
				{#if rezultati.length > 0}
					<div class="searchresults">
						<p>Rezultati pretrage:</p>
						{#each rezultati as { title, slug }}
							<a href="/blog/{slug}">{title}</a>
						{/each}
					</div>
				{/if}
			{/await}
		{/if}
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
		<a href="/moja-misija">Moja misija</a>
		{#if data.user}
			<a href="/video-chat/">Video sesije</a>
			<a class="navprofil" href="/profile/{data.user.username}">
				<img src={data.user.profile_picture} alt="Profil" />
				<p>{data.user.username}</p>
			</a>
		{:else}
			<a href="/login">Prijavi se</a>
		{/if}
		<a class="whatsappwrapper" href="https://wa.me/0953968293" target="_blank" rel="noreferrer">
			<p>Stupimo u kontakt<iconify-icon icon="ic:baseline-whatsapp" /></p>
		</a>
	</div>
{/if}
