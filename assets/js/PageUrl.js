---
---

function navigateToStoryLine() {
    var storyLine = localStorage.getItem("storyLine");
    if (storyLine == null || storyLine == NaN) {
        storyLine = '1';
    }

    //go other page by gamelevel
    switch (storyLine) {
    {% for story in site.storyline %}
        case "{{ forloop.index }}":
            window.location.href = "{{ site.url }}{{ site.baseurl }}{{ story.url }}";
            console.log("{{ site.url }}{{ site.baseurl }}{{ story.url }}");
            break;
    {% endfor %}
    // default:
    //     console.log(typeof storyLine);
    //     console.log(storyLine);
    }   
}