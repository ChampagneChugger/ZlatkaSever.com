<script lang="ts">
	import type { PageData } from "./$types"
	import { goto } from "$app/navigation"

	export let data: PageData
	let search: string
	let pretraga: any

	async function getUsers() {
		const response = await fetch("/api/korisnici", {
			method: "POST",
			body: JSON.stringify(search)
		})
		const data = await response.json()

		return data
	}

	$: if (search) {
		pretraga = getUsers()
	} else {
		pretraga = null
	}

	let odabir: string[] = []

	async function kreirajSesiju() {
		const response = await fetch("/api/kreirajsesiju", {
			method: "POST",
			body: JSON.stringify(odabir)
		})

		const { data } = await response.json()

		goto("/video-chat/" + data)
	}
</script>

<svelte:head>
	<title>Zlatka Sever - Kreiranje video sesije</title>
</svelte:head>

<div class="createsession">
	<h1>Pretraži korisnike</h1>
	<form>
		<input type="text" name="search" placeholder="Pretraži korisnike..." bind:value={search} />
		<button type="submit">Pretraži</button>
	</form>
	{#if search}
		{#await pretraga then rezultat}
			{#if rezultat.data.length > 0}
				<div class="korisnici">
					{#each rezultat.data as { username, name, profile_picture }}
						{#if username != data.user?.username}
							<div class="korisnik">
								<img src={profile_picture} alt={name} />
								<a href="/profile/{username}">{username}</a>
								<button
									on:click={() => {
										if (odabir.includes(username)) {
											let index = odabir.indexOf(username)
											odabir.splice(index, 1)
											odabir = odabir
										} else {
											odabir.push(username)
											odabir = odabir
										}
									}}
									><iconify-icon
										icon="carbon:checkmark-filled"
										class:chosen={odabir.includes(username)}
									/></button
								>
							</div>
						{/if}
					{/each}
				</div>
			{/if}
		{/await}
	{:else}
		<div class="korisnici">
			{#each data.allUsers as { username, name, profile_picture }}
				{#if username != data.user?.username}
					<div class="korisnik">
						<img src={profile_picture} alt={name} />
						<a href="/profile/{username}">{username}</a>
						<button
							on:click={() => {
								if (odabir.includes(username)) {
									let index = odabir.indexOf(username)
									odabir.splice(index, 1)
									odabir = odabir
								} else {
									odabir.push(username)
									odabir = odabir
								}
							}}
							><iconify-icon
								icon="carbon:checkmark-filled"
								class:chosen={odabir.includes(username)}
							/></button
						>
					</div>
				{/if}
			{/each}
		</div>
	{/if}
	{#if odabir}
		<button class="potvrdi" on:click={kreirajSesiju}>Potvrdi</button>
	{/if}
</div>
