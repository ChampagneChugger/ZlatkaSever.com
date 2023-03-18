<script lang="ts">
	import { page } from "$app/stores"
	import "$lib/css/app.css"
</script>

<div class="error">
	<h1>{$page.status}</h1>
	<p>
		{$page.error?.message}
	</p>
	<a href="/">Povratak na <br />početnu stranicu</a>
</div>
