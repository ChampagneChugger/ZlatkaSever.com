<script lang="ts">
	import { Splide } from "@splidejs/svelte-splide"
	import "@splidejs/svelte-splide/css"
	import Slide from "$lib/components/parts/slide.svelte"

	let options = {
		perPage: 1,
		rewind: true,
		gap: 20
	}
</script>

<div class="recenzije">
	<div class="kh">
		<div class="krugh" />
		<h1>Recenzije</h1>
	</div>
	<!--<Splide aria-label="Recenzije" {options}>
		<Slide src={"ja.jpg"} alt={"Slika 1"} />
		<Slide src={"ja.jpg"} alt={"Slika 2"} />
	</Splide>-->
	<h2>Trenutno nema recenzija.</h2>
</div>
