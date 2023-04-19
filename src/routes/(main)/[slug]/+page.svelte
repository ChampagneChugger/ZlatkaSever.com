<script lang="ts">
	import PageHeader from "$lib/components/pageheader.svelte"
	import type { PageData } from "./$types"

	export let data: PageData
	let vlasnik: boolean = false

	$: page = data.post

	$: if (data.user?.userID == page?.userId) {
		vlasnik = true
	}
</script>

<svelte:head>
	<title>Zlatka Sever - {page.title}</title>
</svelte:head>

<div class="page">
	<PageHeader {vlasnik} naslov={page.title} korisnik={page.User.username} ime={page.User.name} />
	<div class="pagecontent">
		<iconify-icon icon="ic:baseline-format-quote" />
		{@html page.content}
	</div>
</div>
