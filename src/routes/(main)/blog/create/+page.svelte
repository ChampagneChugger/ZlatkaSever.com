<script lang="ts">
	import { enhance } from "$app/forms"
	import { slide } from "svelte/transition"
	import { supabase } from "$lib/supabase/supabase"
	import { v4 as uuidv4 } from "uuid"
	import Editor from "$lib/components/editor.svelte"

	let content: string

	let slika: any
	let slikabase64: string | undefined
	let slikaprevelika: boolean = false
	let supaimg: string | undefined

	async function image() {
		let file = slika.files[0]
		let size = file.size / 1024

		const { data } = await supabase.storage.from("slike").upload(uuidv4() + ".png", file)

		supaimg = data?.path

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
</script>

<svelte:head>
	<title>Zlatka Sever - Kreiranje objave</title>
</svelte:head>

<div class="editpage">
	<form use:enhance method="POST" action="?/kreiraj">
		<p>Thumbnail slika</p>
		{#if slikabase64}
			<img class="thumbnail" src={slikabase64} alt="Post Thumbnail" />
		{:else}
			<img class="thumbnail" src="../thumbnail.jpg" alt="Post Thumbnail" />
		{/if}
		<span class="spana spana2">
			<p class="pinfo">MAX 2MB, .PNG ili .JPEG</p>
		</span>
		{#if slikaprevelika}
			<p transition:slide class="slikaerror slikaerror2">
				<span>GREŠKA:</span> Slika je veća od 2MB.
			</p>
		{/if}
		<div class="changepfp">
			<input
				on:change={image}
				bind:this={slika}
				id="avatar"
				name="avatar"
				type="file"
				accept="image/png, image/jpeg"
			/>
			<button>Prenesi svoju sliku</button>
		</div>
		<input class="hidden" type="text" name="base64" bind:value={supaimg} />
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<p>Naslov</p>
		<input class="naslovobjave" type="text" name="title" placeholder="Naslov objave" />
		<p>Sadržaj</p>
		<Editor content={""} bind:content2={content} />
		<input name="pagecontent" type="text" value={content} hidden />
		<div class="buttons">
			<button formaction="?/odustani">Odustani</button>
			<button type="submit">Kreiraj objavu</button>
		</div>
	</form>
</div>
