---
---

var RubbishMetalImgUrls = [ "{{ site.url }}{{ site.baseurl }}/assets\\img\\rubbishs\\Metals\\Can_1.png",
                            "{{ site.url }}{{ site.baseurl }}/assets\\img\\rubbishs\\Metals\\Can_2.png",
                            "{{ site.url }}{{ site.baseurl }}/assets\\img\\rubbishs\\Metals\\Clock_1.png",
                            "{{ site.url }}{{ site.baseurl }}/assets\\img\\rubbishs\\Metals\\Coffee_machine_1.png",
                            "{{ site.url }}{{ site.baseurl }}/assets\\img\\rubbishs\\Metals\\Egg_whisk_1.png",
                            "{{ site.url }}{{ site.baseurl }}/assets\\img\\rubbishs\\Metals\\Gramophone_1.png",
                            "{{ site.url }}{{ site.baseurl }}/assets\\img\\rubbishs\\Metals\\Iron_1.png",
                            "{{ site.url }}{{ site.baseurl }}/assets\\img\\rubbishs\\Metals\\Landline_1.png",
                            "{{ site.url }}{{ site.baseurl }}/assets\\img\\rubbishs\\Metals\\Oven_1.png",
                            "{{ site.url }}{{ site.baseurl }}/assets\\img\\rubbishs\\Metals\\Razor_1.png",
                            "{{ site.url }}{{ site.baseurl }}/assets\\img\\rubbishs\\Metals\\Scale_1.png",
                            "{{ site.url }}{{ site.baseurl }}/assets\\img\\rubbishs\\Metals\\Speaker_1.png",
                            "{{ site.url }}{{ site.baseurl }}/assets\\img\\rubbishs\\Metals\\Speaker_2.png",
                            "{{ site.url }}{{ site.baseurl }}/assets\\img\\rubbishs\\Metals\\Television_1.png",
                            "{{ site.url }}{{ site.baseurl }}/assets\\img\\rubbishs\\Metals\\Television_2.png",
                            "{{ site.url }}{{ site.baseurl }}/assets\\img\\rubbishs\\Metals\\Toaster_1.png",
                            "{{ site.url }}{{ site.baseurl }}/assets\\img\\rubbishs\\Metals\\Typewriter_1.png",
                            "{{ site.url }}{{ site.baseurl }}/assets\\img\\rubbishs\\Metals\\Walkie_talkie_1.png"];

var RubbishPlasticImgUrls = [ "{{ site.url }}{{ site.baseurl }}/assets\\img\\Rubbishs\\Plastics\\Bag_1.png",
                            "{{ site.url }}{{ site.baseurl }}/assets\\img\\Rubbishs\\Plastics\\Bottle_1.png",
                            "{{ site.url }}{{ site.baseurl }}/assets\\img\\Rubbishs\\Plastics\\Bottle_2.png",
                            "{{ site.url }}{{ site.baseurl }}/assets\\img\\Rubbishs\\Plastics\\Bottle_3.png",
                            "{{ site.url }}{{ site.baseurl }}/assets\\img\\Rubbishs\\Plastics\\Bottle_4.png",
                            "{{ site.url }}{{ site.baseurl }}/assets\\img\\Rubbishs\\Plastics\\Bottle_5.png",
                            "{{ site.url }}{{ site.baseurl }}/assets\\img\\Rubbishs\\Plastics\\Bucket_1.png",
                            "{{ site.url }}{{ site.baseurl }}/assets\\img\\Rubbishs\\Plastics\\Cup_1.png",
                            "{{ site.url }}{{ site.baseurl }}/assets\\img\\Rubbishs\\Plastics\\Cup_2.png",
                            "{{ site.url }}{{ site.baseurl }}/assets\\img\\Rubbishs\\Plastics\\Fork_1.png",
                            "{{ site.url }}{{ site.baseurl }}/assets\\img\\Rubbishs\\Plastics\\Pot_1.png",
                            "{{ site.url }}{{ site.baseurl }}/assets\\img\\Rubbishs\\Plastics\\Pot_2.png",
                            "{{ site.url }}{{ site.baseurl }}/assets\\img\\Rubbishs\\Plastics\\Pot_3.png",
                            "{{ site.url }}{{ site.baseurl }}/assets\\img\\Rubbishs\\Plastics\\Spoon_1.png",
                            "{{ site.url }}{{ site.baseurl }}/assets\\img\\Rubbishs\\Plastics\\Straw_1.png",
                            "{{ site.url }}{{ site.baseurl }}/assets\\img\\Rubbishs\\Plastics\\Toothbrush_1.png"];


var Rubbishs = [];

class Rubbish extends ImgComponent{
    constructor(width, height, x, y, speedX, speedY, img, globalAlpha, Maxlife) {
        super(width, height, x, y, speedX, speedY, img, globalAlpha);
        this.life = Maxlife;
        this.Maxlife = Maxlife;
      }
    update(){
        super.update();
        let ctx = GameArea.context;
        if (this.life > 0){
            ctx.fillStyle = "#FF0000";
            ctx.fillRect(this.x, this.y-5, this.width * this.life/this.Maxlife, 2);
        }
    }
}