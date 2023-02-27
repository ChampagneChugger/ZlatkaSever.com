<script lang="ts">
	import { SplideSlide } from "@splidejs/svelte-splide"

	export let src: string
	export let alt: string
</script>

<SplideSlide>
	<!-- svelte-ignore a11y-img-redundant-alt -->
	<img {src} {alt} />
</SplideSlide>
