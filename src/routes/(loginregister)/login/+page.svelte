<script lang="ts">
	import { goto } from "$app/navigation"
	import { enhance } from "$app/forms"
	import { page } from "$app/stores"
	import { scale } from "svelte/transition"
	import type { ActionData } from "./$types"

	let showpassword: boolean = false
	let showpasswordtype: string = "password"

	$: if (showpassword) {
		showpasswordtype = "text"
	} else {
		showpasswordtype = "password"
	}

	let email: string | null

	if ($page.url.searchParams.get("email")) {
		email = $page.url.searchParams.get("email")
	}

	export let form: ActionData
</script>

<div class="registerc">
	<div class="registerimg">
		<img src="logo.svg" alt="Logo" />
	</div>
	<div class="registerform">
		<h1>
			{#if $page.url.searchParams.get("success")}
				Uspjeh, prijavi se
			{:else}Prijavi se
			{/if}
		</h1>
		<form use:enhance method="POST">
			<input
				required
				bind:value={email}
				name="email"
				type="email"
				placeholder="Vaša email adresa..."
			/>
			<span
				><input required name="lozinka" type={showpasswordtype} placeholder="Vaša lozinka..." />
				<button
					on:click|preventDefault={() => {
						showpassword = !showpassword
					}}><iconify-icon icon="ic:baseline-remove-red-eye" /></button
				></span
			>
			{#if form?.message}
				<p transition:scale class="error">{form.message}</p>
			{/if}
			<button>Prijavi se</button>
			<button
				on:click|preventDefault={() => {
					goto("/")
				}}>Odustani</button
			>
			<p>Nemate profil? <a href="/register">Registriraj se.</a></p>
		</form>
	</div>
</div>
