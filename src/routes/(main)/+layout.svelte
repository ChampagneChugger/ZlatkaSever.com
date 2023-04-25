<script lang="ts">
	import "$lib/css/app.css"
	import "iconify-icon"
	import Navigation from "$lib/components/navigation.svelte"
	import Footer from "$lib/components/footer.svelte"
	import NavAdj from "$lib/components/navigationadjust.svelte"
	import popup from "$lib/stores/popup"
	import { page } from "$app/stores"
	import type { LayoutData } from "./$types"
	import { dev } from "$app/environment"
	import { inject } from "@vercel/analytics"

	inject({ mode: dev ? "development" : "production" })

	export let data: LayoutData

	export let navHeight: number

	$: if ($page.url) {
		$popup = false
	}
</script>

<main>
	<NavAdj bind:navHeight />
	<Navigation bind:navHeight {data} />
	<slot />
	<Footer footerposts={data.footerposts} />
</main>
