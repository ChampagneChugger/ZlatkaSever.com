<script lang="ts">
	import "$lib/css/app.css"
	import "iconify-icon"
	import { dev } from "$app/environment"
	import { inject } from "@vercel/analytics"

	inject({ mode: dev ? "development" : "production" })
</script>

<main>
	<slot />
</main>
