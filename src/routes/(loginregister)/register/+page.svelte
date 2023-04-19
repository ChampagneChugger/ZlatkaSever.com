<script lang="ts">
	import { goto } from "$app/navigation"
	import { enhance } from "$app/forms"
	import { scale } from "svelte/transition"
	import type { ActionData } from "./$types"

	let showpassword: boolean = false
	let showpasswordtype: string = "password"

	$: if (showpassword) {
		showpasswordtype = "text"
	} else {
		showpasswordtype = "password"
	}

	export let form: ActionData
</script>

<svelte:head>
	<title>Zlatka Sever - Registracija</title>
</svelte:head>

<div class="registerc">
	<div class="registerimg">
		<img src="logo.svg" alt="Logo" />
	</div>
	<div class="registerform">
		<h1>Registriraj se</h1>
		<form use:enhance method="POST">
			<input required name="ime" type="text" maxlength="30" placeholder="Vaše ime..." />
			<input
				required
				name="korisnickoime"
				type="text"
				maxlength="15"
				placeholder="Vaše korisničko ime..."
			/>
			<input required name="email" type="email" placeholder="Vaša email adresa..." />
			<span
				><input
					required
					name="lozinka"
					minlength="6"
					type={showpasswordtype}
					placeholder="Vaša lozinka..."
				/>
				<button
					on:click|preventDefault={() => {
						showpassword = !showpassword
					}}><iconify-icon icon="ic:baseline-remove-red-eye" /></button
				></span
			>
			{#if form?.message}
				<p transition:scale class="error">{form.message}</p>
			{/if}
			<button>Registriraj se</button>
			<button
				on:click|preventDefault={() => {
					goto("/")
				}}>Odustani</button
			>
			<p>Imate profil? <a href="/login">Prijavite se.</a></p>
		</form>
	</div>
</div>
