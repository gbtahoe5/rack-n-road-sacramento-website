# Phase 2 merge instructions

This package adds the reviewed production root and Netlify configuration. It does not replace the preservation folders already in the repository.

1. Unzip `rack-n-road-phase-2-production-2026-08-15.zip`.
2. Open the unzipped folder and copy its contents into the local `rack-n-road-sacramento-website` repository folder.
3. On a Finder conflict, choose **Merge** for folders and **Replace** for `README.md` and `netlify.toml`.
4. In GitHub Desktop, verify that the changed files are limited to `production/`, `scripts/`, `docs/`, `README.md`, and `netlify.toml`.
5. Use the commit summary `Add production-ready Netlify site`, commit to `main`, and push origin.

After the push, Netlify should use:

- Production branch: `main`
- Build command: leave blank
- Publish directory: `production`

The repository-root `netlify.toml` also declares the publish directory, clean routes, and staging safety headers.
