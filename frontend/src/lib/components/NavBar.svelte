<script lang="ts">
  import {page} from '$app/state'
  import {getBasePathname} from '$lib/utils'

  const basePath = $derived(getBasePathname(page.route.id))
</script>

<nav>
  <nav class="layout-nav">
    <div class="logo">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
      >
        <path
          fill="#2175d9"
          d="M28.967 12H9.442a2 2 0 0 0-1.898 1.368L4 24V10h24a2 2 0 0 0-2-2H15.124a2 2 0 0 1-1.28-.464l-1.288-1.072A2 2 0 0 0 11.276 6H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h22l4.805-11.212A2 2 0 0 0 28.967 12"
        />
        <path
          fill="#88beff"
          d="M14 15v4a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H15a1 1 0 0 0-1 1m6 3h-4v-2h4Zm4 0h-2v-2h2Zm-10 5v4a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H15a1 1 0 0 0-1 1m6 3h-4v-2h4Zm4 0h-2v-2h2Z"
        />
      </svg>
      <p>DCO Hub</p>
    </div>
    <div class="links-wrap">
      <a class={`nav-link${basePath === '/' ? ' active' : ''}`} href="/">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <path
            fill="#989898"
            d="M22 9L12 1L2 9v2h2v10h5v-4a3 3 0 1 1 6 0v4h5V11h2z"
          />
        </svg>
        <p>Home</p>
      </a>
      <a class={`nav-link${basePath === '/guides' ? ' active' : ''}`} href="/guides">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <path
            fill="#989898"
            d="M4 3h2v18H4zm14 0H7v18h11c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m-2 6h-6V8h6zm0-2h-6V6h6z"
          />
        </svg>
        <p>Guides</p>
      </a>
    </div>
  </nav>
</nav>

<style>
  .layout-nav {
    height: 100vh;
    width: var(--nav-width);
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    padding: var(--default-spacing);
    border-right: var(--default-border);
    z-index: 100;
  }

  .nav-link {
		display: block;
		color: var(--muted-text-color);
		text-decoration: none;
		transition: color var(--default-transition), opacity var(--default-transition);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.nav-link:hover {
		color: var(--accent-color);
	}
	.nav-link:hover path {
		fill: var(--accent-color);
	}
	.nav-link.active {
		opacity: 0.8;
		color: var(--accent-color);
	}
	.nav-link.active path {
		fill: var(--accent-color);
	}
  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: var(--default-border);
    padding-bottom: 0.5rem;
    margin-bottom: calc(var(--default-spacing) * 2);
    height: var(--nav-height);
  }

  .logo p {
    margin-left: 0.5rem;
  }

  .links-wrap {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .links-wrap .nav-link {
    margin-bottom: 2rem;
  }
</style>