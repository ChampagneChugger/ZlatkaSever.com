<script lang="ts">
	import { enhance } from "$app/forms"

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

<div class="blogheader">
	<h1>Blog</h1>
	<div class="formwrapper">
		<form on:submit|preventDefault={pretraga}>
			<label for="search">
				<iconify-icon icon="material-symbols:search-rounded" />
				<input bind:value={search} id="search" type="text" placeholder="Pretraga" />
			</label>
		</form>
	</div>
</div>
{#if search}
	{#await rezultat then rezultati}
		{#if rezultati.length > 0}
			<div class="searchresults searchresults2">
				<p>Rezultati pretrage:</p>
				{#each rezultati as { title, slug }}
					<a href="/blog/{slug}">{title}</a>
				{/each}
			</div>
		{/if}
	{/await}
{/if}
