---
---

export const RubbishMetalImgUrls = [{% for image in site.static_files %}{% if image.path contains 'img/rubbishs/metals' %}'{{ site.url }}{{ site.baseurl }}{{ image.path }}', {% endif %}{% endfor %}];
export const RubbishPlasticImgUrls = [{% for image in site.static_files %}{% if image.path contains 'img/rubbishs/plastics' %}'{{ site.url }}{{ site.baseurl }}{{ image.path }}', {% endif %}{% endfor %}];

export const HeartImgUrl = `{{ site.url }}{{ site.baseurl }}/assets/img/ui/heart.png`;

export const PlaneImgUrls = [{% for image in site.static_files %}{% if image.path contains 'img/plane' %}'{{ site.url }}{{ site.baseurl }}{{ image.path }}', {% endif %}{% endfor %}];
export const BulletImgUrls = [{% for image in site.static_files %}{% if image.path contains 'img/bullet' %}'{{ site.url }}{{ site.baseurl }}{{ image.path }}', {% endif %}{% endfor %}];