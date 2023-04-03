<script lang="ts">
	import Editor from "$lib/components/editor.svelte"
	import { enhance } from "$app/forms"
	import { slide } from "svelte/transition"
	import type { PageData } from "./$types"

	export let data: PageData

	let page = data.page
	let content: string

	let slika: any
	let slikabase64: string | undefined
	let slikaprevelika: boolean = false

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

	$: post = data.page
</script>

<div class="editpage">
	<form use:enhance method="POST" action="?/uredi">
		<p>Thumbnail slika</p>
		{#if slikabase64}
			<img class="thumbnail" src={slikabase64} alt="Post Thumbnail" />
		{:else}
			<img class="thumbnail" src={page.coverImage} alt="Post Thumbnail" />
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
			<button>Promijeni sliku profila</button>
		</div>
		<input class="hidden" type="text" name="base64" bind:value={slikabase64} />
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<p>Sadržaj</p>
		<Editor content={post.content} bind:content2={content} />
		<input name="pagecontent" type="text" value={content} hidden />
		<input name="pageid" type="text" value={post.id} hidden />
		<div class="buttons">
			<button formaction="?/odustani">Odustani</button>
			<button type="submit">Završi uređivanje</button>
		</div>
	</form>
</div>
