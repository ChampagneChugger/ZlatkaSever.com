<script lang="ts">
	import popup from "$lib/stores/popup"
	import { goto } from "$app/navigation"
	import type { PageData } from "../../routes/(main)/./$types"

	export let data: PageData
</script>

<header>
	<div class="headerwrap">
		<div class="headerp1">
			<h1>Zlatka Sever</h1>
			<h2>Terapeut</h2>
		</div>
		<div class="slika">
			<div class="krug" />
			<img src="ja.jpg" alt="Fotografija Zlatke Sever" />
		</div>
	</div>
	<h3>Otkrijte svoj put</h3>
	{#if !data.user}
		<div class="findmorec">
			<button
				class="findmore"
				on:click={() => {
					$popup = true
				}}
				>Prijavi se
				<div class="krugl">
					<div class="strelica">
						<div class="crta" />
						<div class="gdio" />
						<di class="ddio" />
					</div>
				</div>
			</button>
		</div>
	{:else}
		<div class="findmorec">
			<button
				id="omeni"
				class="findmore"
				on:click={() => {
					goto("/#omeni")
				}}
				>Idi dalje
				<div class="krugl">
					<div class="strelica">
						<div class="crta" />
						<div class="gdio" />
						<di class="ddio" />
					</div>
				</div>
			</button>
		</div>
	{/if}
</header>
