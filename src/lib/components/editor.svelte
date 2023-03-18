<script lang="ts">
	//@ts-nocheck
	import { quill } from "svelte-quill"
	import "$lib/css/quill.snow.css"
	import { onMount, tick } from "svelte"

	let editor: HTMLElement

	onMount(() => {
		editor = document.getElementsByClassName("ql-editor")[0]
	})

	const options = {
		modules: {
			toolbar: {
				container: [
					[{ header: [1, 2, 3, false] }, { size: ["small", false, "large", "huge"] }],
					["bold", "italic", "underline", "strike", "link", "code-block", "video", "image"]
				],
				handlers: {
					image: imageHandler
				}
			}
		},
		placeholder: "Napiši nešto",
		theme: "snow"
	}

	async function imageHandler() {
		let fileInput = this.container.querySelector("input.ql-image[type=file]")
		if (fileInput == null) {
			fileInput = document.createElement("input")
			fileInput.setAttribute("type", "file")
			fileInput.setAttribute("accept", "image/png, image/gif, image/jpeg, image/bmp, image/x-icon")
			fileInput.classList.add("ql-image")
			fileInput.addEventListener("change", async () => {
				if (fileInput.files != null && fileInput.files[0] != null) {
					let reader = new FileReader()
					reader.onload = async (e) => {
						let range = this.quill.getSelection(true)

						const response = await fetch("/api/imageupload", {
							method: "POST",
							body: JSON.stringify(e.target?.result)
						})

						const { uploadedData } = await response.json()

						this.quill.editor.insertEmbed(range.index, "image", uploadedData)
						fileInput.value = ""
					}
					reader.readAsDataURL(fileInput.files[0])
				}
			})
			this.container.appendChild(fileInput)
		}
		fileInput.click()
	}

	export let content: string

	async function sync() {
		await tick()
		if (editor) {
			editor.innerHTML = content
		}
	}

	sync()

	export let content2: string

	$: content2 = content.html
</script>

<div class="editor" use:quill={options} on:text-change={(e) => (content = e.detail)} />
