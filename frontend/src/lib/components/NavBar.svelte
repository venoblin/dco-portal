<script>
  import {page} from '$app/state'
  import {getBasePathname} from '$lib/utils'

  const basePath = $derived(getBasePathname(page.route.id))
</script>

<nav>
  <div>
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
      <div>
        <a class={`nav-link${basePath === '/' ? ' active' : ''}`} href="/">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
            <g fill="none">
              <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
              <path fill="#989898" d="M13.228 2.688a2 2 0 0 0-2.456 0l-8.384 6.52C1.636 9.795 2.05 11 3.003 11H4v8a2 2 0 0 0 2 2h4v-6a2 2 0 1 1 4 0v6h4a2 2 0 0 0 2-2v-8h.997c.952 0 1.368-1.205.615-1.791z" />
            </g>
          </svg>
          <p>Home</p>
        </a>
        <a class={`nav-link${basePath === '/guides' ? ' active' : ''}`} href="/guides">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
            <g fill="none" fill-rule="evenodd">
              <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
              <path fill="#989898" d="M4 5a3 3 0 0 1 3-3h11a2 2 0 0 1 2 2v12.99c0 .168-.038.322-.113.472l-.545 1.09a1 1 0 0 0 0 .895l.543 1.088A1 1 0 0 1 19 22H7a3 3 0 0 1-3-3zm3 13h10.408a3 3 0 0 0 0 2H7a1 1 0 1 1 0-2m3-11a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2z" />
            </g>
          </svg>
          <p>Guides</p>
        </a>
      </div>
    </div>
  </div>

  <div class="links-wrap">
      <a class={`nav-link${basePath === '/profile' ? ' active' : ''}`} aria-label="Profile" href="/profile">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
          <g fill="none" fill-rule="evenodd">
            <path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z" />
            <path fill="#989898" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2M8.5 9.5a3.5 3.5 0 1 1 7 0a3.5 3.5 0 0 1-7 0m9.758 7.484A7.99 7.99 0 0 1 12 20a7.99 7.99 0 0 1-6.258-3.016C7.363 15.821 9.575 15 12 15s4.637.821 6.258 1.984" />
          </g>
        </svg>
      </a>
    </div>
</nav>

<style>
  nav {
    height: 100vh;
    width: var(--nav-width);
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .links-wrap .nav-link {
    margin-bottom: 1.5rem;
  }

  .links-wrap .nav-link:last-of-type {
    margin-bottom: 0;
  }
</style>