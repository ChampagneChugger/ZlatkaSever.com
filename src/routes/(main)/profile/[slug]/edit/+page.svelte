<script lang="ts">
	import { enhance } from "$app/forms"

	let slika: any
	let slikabase64: string | undefined
	let prikaz: boolean = false

	async function image() {
		let file = slika.files[0]
		let size = file.size / 1024

		if (size <= 2048) {
			let reader = new FileReader()

			reader.onloadend = () => {
				slikabase64 = reader.result?.toString()
			}

			reader.readAsDataURL(file)
			prikaz = true
		} else {
			console.log("Slika je veca od 2MB.")
			prikaz = false
			slika.value = ""
		}
	}
</script>

<div class="editprofile">
	{#if prikaz}
		<img src={slikabase64} alt="Slika" />
	{/if}
	<h1>Profil</h1>
	<h2>Svoje postavke možeš promijeniti ispod</h2>
	<form use:enhance method="POST">
		<label for="avatar">Avatar</label>
		<input
			on:change={image}
			bind:this={slika}
			id="avatar"
			name="avatar"
			type="file"
			accept="image/png, image/jpeg"
		/>
		<input type="text" name="base64" bind:value={slikabase64} />
		<button type="submit">SEND</button>
	</form>
</div>
