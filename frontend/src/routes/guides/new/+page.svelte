<script lang="ts">
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'
  import { postGuide } from '$lib/service/guidesService'

  let author = $state('')
  let title = $state('')

  let quill: any
  const toolbarOptions = [
    [
      { header: [1, 2, 3, 4, 5, 6, false] },
      { size: ['small', false, 'large', 'huge'] }
    ],

    ['bold', 'italic', 'underline', 'strike', { color: [] }, { background: [] }],

    ['link', 'image', 'video', 'formula', 'blockquote', 'code-block'],

    [{ align: [] }, { direction: 'rtl' }, { indent: '-1' }, { indent: '+1' }],

    [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],

    [{ script: 'sub' }, { script: 'super' }],

    ['clean']
  ]

  const onSubmit = async (event: Event) => {
    event.preventDefault()
    const newGuide = {
      author: author,
      title: title,
      content: quill.root.innerHTML,
      shortDescription: quill.root.innerText.slice(0, 255)
    }

    const guide = await postGuide(newGuide)

    author = ''
    title = ''
    quill.root.innerHTML = ''
    quill.root.innerText = ''

    goto(`/guides/${guide.id}`)
  }
  
  onMount(async () => {
    const { default: Quill } = await import('quill');
    import('quill/dist/quill.snow.css');
    
    quill = new Quill('#editor', {
      modules: {
        toolbar: toolbarOptions
      },
      theme: 'snow'
    })
  })
</script>

<header>
  <div>
    <a href="/guides">← Back</a>
    <h1>New Guide</h1>
  </div>

  <div>
    <button form="new-guide-form">Create</button>
  </div>
</header>

<form class="new-guide-form" id="new-guide-form" onsubmit={(event) => onSubmit(event)}>
  <div>
    <label for="author">Author</label>
    <input
      required
      type="text"
      name="author"
      id="author"
      placeholder="Author"
      bind:value={author}
    />
  </div>
  <div>
    <label for="title">Title</label>
    <input
      required
      type="text"
      name="title"
      id="title"
      placeholder="Title"
      bind:value={title}
    />
  </div>
  <div class="editor-container">
    <div id="editor"></div>
  </div>
</form>

<style>
  .new-guide-form {
    margin-top: var(--default-spacing);
    width: 100%;
  }

  .new-guide-form div {
    display: flex;
    flex-direction: column;
    margin-bottom: 0.5rem;
  }

  .new-guide-form div:last-of-type {
    margin-bottom: var(--default-spacing);
  }

  .editor-container {
    background: var(--text-color);
    color: var(--bg-color);
    width: 100%;
    border-radius: var(--default-border-radius);
    padding: var(--default-spacing);
  }

  :global {
    .editor-container .ql-toolbar.ql-snow {
      flex-direction: row;
      font-family: var(--body-font-family);
      border: none;
      border-bottom: var(--default-border);
    }
    .editor-container .ql-editor {
      font-family: var(--body-font-family);
      height: 550px;
      overflow-y: scroll;
    }
    .editor-container .ql-container.ql-snow {
      font-family: var(--body-font-family);
      border: none;
    }
    .editor-container .ql-toolbar .ql-picker-options {
      background: var(--text-color);
    }
    .editor-container .ql-snow.ql-toolbar button:hover .ql-stroke,
    .editor-container .ql-snow .ql-toolbar button:hover .ql-stroke,
    .editor-container .ql-snow.ql-toolbar button:focus .ql-stroke,
    .editor-container .ql-snow .ql-toolbar button:focus .ql-stroke,
    .editor-container .ql-snow.ql-toolbar button.ql-active .ql-stroke,
    .editor-container .ql-snow .ql-toolbar button.ql-active .ql-stroke,
    .editor-container .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke,
    .editor-container .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke,
    .editor-container .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke,
    .editor-container .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke,
    .editor-container .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke,
    .editor-container .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke,
    .editor-container .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke,
    .editor-container .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke,
    .editor-container .ql-snow.ql-toolbar button:hover .ql-stroke-miter,
    .editor-container .ql-snow .ql-toolbar button:hover .ql-stroke-miter,
    .editor-container .ql-snow.ql-toolbar button:focus .ql-stroke-miter,
    .editor-container .ql-snow .ql-toolbar button:focus .ql-stroke-miter,
    .editor-container .ql-snow.ql-toolbar button.ql-active .ql-stroke-miter,
    .editor-container .ql-snow .ql-toolbar button.ql-active .ql-stroke-miter,
    .editor-container .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke-miter,
    .editor-container .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke-miter,
    .editor-container .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,
    .editor-container .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,
    .editor-container .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke-miter,
    .editor-container .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke-miter,
    .editor-container .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter,
    .editor-container .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter {
      stroke: var(--accent-color);
    }
  }
  

</style>