<script lang="ts">
	import Editor from "$lib/components/editor.svelte"
	import { enhance } from "$app/forms"
	import type { PageData } from "./$types"

	export let data: PageData

	let page = data.page
	let content: string
</script>

<div class="editpage">
	<form use:enhance method="POST" action="?/uredi">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<p>Sadržaj</p>
		<Editor content={page.content} bind:content2={content} />
		<input name="pagecontent" type="text" value={content} hidden />
		<input name="pageid" type="text" value={page.id} hidden />
		<div class="buttons">
			<button formaction="?/odustani">Odustani</button>
			<button type="submit">Završi uređivanje</button>
		</div>
	</form>
</div>
