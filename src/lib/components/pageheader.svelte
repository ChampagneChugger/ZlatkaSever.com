<script lang="ts">
	import { page } from "$app/stores"
	import { goto } from "$app/navigation"
	export let naslov: string
	export let korisnik: string
	export let ime: string
	export let vlasnik: boolean
</script>

<div class="pageheader">
	<h1>{naslov}</h1>
	<span>
		<p>Napisao:</p>
		<a href="/profile/{korisnik}">{ime}</a>
		{#if vlasnik}
			<button
				on:click={() => {
					goto($page.params.slug + "/edit")
				}}>Uredi</button
			>
		{/if}
	</span>
</div>
