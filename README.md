# Chula Astronomy Multidisciplinary Project

Source for the research website of **Taweewat Somboonpanyakul** and the Chulalongkorn astronomy research group.

**Live site:** [leogulus.github.io](https://leogulus.github.io/)

The site is built with [Jekyll](https://jekyllrb.com/) and the [al-folio](https://github.com/alshedivat/al-folio) academic theme. It is published through GitHub Pages and GitHub Actions.

## Where to edit content

| What you want to update | Location |
| --- | --- |
| Site identity, navigation behaviour, social links, analytics, and plugins | `_config.yml` |
| Home page and top-level pages | `_pages/` |
| Research-group members | `_pages/groups.md` |
| News and event posts | `_news/` |
| Publications | `_bibliography/papers.bib` |
| Images, PDFs, audio, and video | `assets/` |
| Layouts and reusable page components | `_layouts/` and `_includes/` |
| Visual styling | `_sass/` and `assets/css/main.scss` |

### Add a news item

Create a Markdown file in `_news/` with front matter similar to:

```yaml
---
layout: post
title: "Event title"
date: 2026-07-13 09:00:00+0700
inline: false
---
```

Set `inline: true` for a short announcement without its own detail page. Use `{% include figure.html %}` in the body to add responsive photos, following the recent items in `_news/` as examples.

### Add a publication

Add a BibTeX entry to `_bibliography/papers.bib`. The publications page is generated automatically by `jekyll-scholar`. Add `selected = {true}` to feature a paper on the home page.

## Local preview

The deployment workflow uses Ruby 3.2.2. On this Mac, the local setup uses Homebrew Ruby.

```bash
# Install the Ruby version used by the site (one time)
brew install ruby@3.2

# Install Ruby dependencies inside this repository
/opt/homebrew/opt/ruby@3.2/bin/bundle config set --local path vendor/bundle
/opt/homebrew/opt/ruby@3.2/bin/bundle install

# Preview the site at http://127.0.0.1:4000/
/opt/homebrew/opt/ruby@3.2/bin/bundle exec jekyll serve --host 127.0.0.1 --port 4000
```

Jekyll watches for changes automatically. Refresh the browser after saving a file.

## Deployment

`.github/workflows/deploy.yml` builds every pull request and deploys only pushes to `master` or `main`.

The workflow:

1. installs the locked Ruby/Jekyll dependencies;
2. builds `_site`;
3. uploads the static-site artifact; and
4. publishes it through the official GitHub Pages deployment action.

To publish a change, commit and push it to `master`. The GitHub Pages source must remain set to **GitHub Actions** in repository settings.

## Media guidelines

- Put website media in `assets/` and reference it with a relative path such as `assets/img/event/photo.jpg`.
- Before uploading event photography, resize JPEGs to a maximum edge of **2000 px** and use approximately **quality 78–80**.
- Keep original full-resolution photos outside this repository.
- Keep posters and scientific figures in PNG/PDF only when that format is needed for legibility.
- Avoid replacing an existing file with a different aspect ratio unless the associated page is reviewed locally.

## Keeping dependencies current

[Dependabot](.github/dependabot.yml) opens monthly update pull requests for GitHub Actions and Ruby gems. Review each pull request's build before merging.

## Theme attribution

This site is based on [al-folio](https://github.com/alshedivat/al-folio), a Jekyll theme for academic websites.
