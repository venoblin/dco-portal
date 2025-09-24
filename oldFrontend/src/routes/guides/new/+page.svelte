<script>
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'
  import { postGuide } from '$lib/services/guides'

  let author = $state('')
  let title = $state('')
  let quill
  const toolbarOptions = [
    [
      { header: [2, 3, 4, 5, 6, false] },
      { size: ['small', false, 'large', 'huge'] }
    ],

    ['bold', 'italic', 'underline', 'strike', { color: [] }, { background: [] }],

    ['link', 'image', 'video', 'formula', 'blockquote', 'code-block'],

    [{ align: [] }, { direction: 'rtl' }, { indent: '-1' }, { indent: '+1' }],

    [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],

    [{ script: 'sub' }, { script: 'super' }],

    ['clean']
  ]

  const onSubmit = async (event) => {
    event.preventDefault()
    const newGuide = {
      author: author,
      title: title,
      content: quill.root.innerHTML,
      shortDescription: quill.root.innerText.slice(0, 255)
    }

    const res = await postGuide(newGuide)

    author = ''
    title = ''
    quill.root.innerHTML = ''
    quill.root.innerText = ''

    goto(`/guides/${res.guide.id}`)
  }
  
  onMount(async () => {
    const { default: Quill } = await import('quill')
    
    quill = new Quill('#editor', {
      modules: {
        toolbar: toolbarOptions
      },
      theme: 'snow'
    })
  })
</script>
