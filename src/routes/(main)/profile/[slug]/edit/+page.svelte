<script lang="ts">
	import { enhance } from "$app/forms"
	import { slide } from "svelte/transition"
	import type { PageData } from "./$types"

	let slika: any
	let slikabase64: string | undefined
	let slikaprevelika: boolean = false
	export let data: PageData

	async function image() {
		let file = slika.files[0]
		let size = file.size / 1024

		if (size <= 2048) {
			slikaprevelika = false
			let reader = new FileReader()

			reader.onloadend = () => {
				slikabase64 = reader.result?.toString()
			}

			reader.readAsDataURL(file)
		} else {
			slikaprevelika = true
			slika.value = ""
			slikabase64 = ""
		}
	}

	$: profile = data.profile
</script>

<div class="editprofile">
	<h1>Profil</h1>
	<h2>Svoje postavke možete promijeniti ispod</h2>
	<form use:enhance method="POST">
		<label class="labelavatar" for="avatar">
			{#if slikabase64}
				<img src={slikabase64} alt="Slika profila" />
			{:else}
				<img src={profile?.profile_picture} alt="Slika profila" />
			{/if}
			<span class="spana">
				<p class="pa">Avatar</p>
				<p class="pinfo">MAX 2MB, .PNG ili .JPEG</p>
			</span>
		</label>
		<div class="changepfp">
			<input
				on:change={image}
				bind:this={slika}
				id="avatar"
				name="avatar"
				type="file"
				accept="image/png, image/jpeg"
			/>
			<button>Promijeni sliku profila</button>
		</div>
		{#if slikaprevelika}
			<p transition:slide class="slikaerror"><span>GREŠKA:</span> Slika je veća od 2MB.</p>
		{/if}
		<input class="hidden" type="text" name="base64" bind:value={slikabase64} />
		<label class="label2" for="name">
			Ime
			<input type="text" id="name" name="name" maxlength="30" value={profile?.name} />
		</label>
		<label class="label2" for="about">
			O meni
			<textarea id="about" name="about" maxlength="200" value={profile?.about} />
		</label>
		<button class="profilebutton" type="submit">Spremi promjene</button>
	</form>
</div>
