---
title: "Blog"
permalink: /blog/
author_profile: true
---

<div class="archive">
{% for post in site.posts %}
  <div class="list__item">
    <article class="archive__item">
      <h2 class="archive__item-title">
        <a href="{{ post.url }}" target="_self">{{ post.title }}</a>
      </h2>
      <p class="page__meta">{{ post.date | date: "%B %-d, %Y" }}</p>
      <p class="archive__item-excerpt">{{ post.excerpt | strip_html | truncatewords: 50 }}</p>
    </article>
  </div>
{% endfor %}
</div>
