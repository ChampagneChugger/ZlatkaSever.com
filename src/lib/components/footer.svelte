<script lang="ts">
	let year = new Date().getFullYear()

	type FooterPosts = {
		title: string
		slug: string
	}[]

	export let footerposts: FooterPosts
</script>

<footer>
	<a class="footera" href="/">Zlatka Sever</a>
	<div class="socialmedia">
		<a href="https://www.instagram.com/zlatkasever/" rel="noreferrer" target="_blank"
			><i><iconify-icon icon="mdi:instagram" /></i></a
		>
		<a href="https://www.facebook.com/zlatkas1" rel="noreferrer" target="_blank"
			><i><iconify-icon icon="ic:baseline-facebook" /></i></a
		>
	</div>
	<div class="footermenu">
		<div class="footertab">
			<h1>Terapije</h1>
			<a href="/brzo-transformacijska-terapija">Brzo transformacijska terapija</a>
			<a href="/hipnoterapija">Hipnoterapija</a>
		</div>
		<div class="footertab">
			<h1>Blog</h1>
			{#each footerposts as { title, slug }}
				<a href="/blog/{slug}">{title}</a>
			{/each}
		</div>
		<div class="footertab">
			<h1>Coaching</h1>
			<a href="/coaching">Coaching</a>
		</div>
		<div class="footertab">
			<h1>Moja misija</h1>
			<a href="/moja-misija">Moja misija</a>
		</div>
	</div>
	<hr />
	<div class="copyright">&copy; {year} Zlatka Sever | All rights reserved</div>
</footer>
