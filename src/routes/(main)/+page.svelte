<script lang="ts">
	import Header from "$lib/components/header.svelte"
	import Omeni from "$lib/components/omeni.svelte"
	import Garancija from "$lib/components/garancija.svelte"
	import Rad from "$lib/components/rad.svelte"
	import Recenzije from "$lib/components/recenzije.svelte"
	import Konzultacije from "$lib/components/konzultacije.svelte"
	import Popup from "$lib/components/parts/pop.svelte"
	import popup from "$lib/stores/popup"
	import type { PageData } from "./$types"
	import { page } from "$app/stores"
	import { onMount } from "svelte"

	export let err: string | null = $page.url.searchParams.get("message")

	export let data: PageData

	onMount(async () => {
		if (err) {
			$popup = true
		}
	})
</script>

<Header {data} />
<Omeni />
<Garancija />
<Rad {data} />
<Recenzije />
<Konzultacije {data} />
{#if $popup}
	<Popup {err} />
{/if}
