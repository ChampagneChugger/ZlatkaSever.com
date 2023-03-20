<script lang="ts">
	import { enhance } from "$app/forms"
</script>

<div class="blogheader">
	<h1>Blog</h1>
	<div class="formwrapper">
		<form use:enhance method="POST">
			<label for="search">
				<iconify-icon icon="material-symbols:search-rounded" />
				<input id="search" type="text" placeholder="Pretraga" />
			</label>
		</form>
	</div>
</div>
