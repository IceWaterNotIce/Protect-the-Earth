var RubbishMetalImgUrls = [ "Image\\Rubbishs\\Metals\\Can_1.png",
                            "Image\\Rubbishs\\Metals\\Can_2.png",
                            "Image\\Rubbishs\\Metals\\Clock_1.png",
                            "Image\\Rubbishs\\Metals\\Coffee_machine_1.png",
                            "Image\\Rubbishs\\Metals\\Egg_whisk_1.png",
                            "Image\\Rubbishs\\Metals\\Gramophone_1.png",
                            "Image\\Rubbishs\\Metals\\Iron_1.png",
                            "Image\\Rubbishs\\Metals\\Landline_1.png",
                            "Image\\Rubbishs\\Metals\\Oven_1.png",
                            "Image\\Rubbishs\\Metals\\Razor_1.png",
                            "Image\\Rubbishs\\Metals\\Scale_1.png",
                            "Image\\Rubbishs\\Metals\\Speaker_1.png",
                            "Image\\Rubbishs\\Metals\\Speaker_2.png",
                            "Image\\Rubbishs\\Metals\\Television_1.png",
                            "Image\\Rubbishs\\Metals\\Television_2.png",
                            "Image\\Rubbishs\\Metals\\Toaster_1.png",
                            "Image\\Rubbishs\\Metals\\Typewriter_1.png",
                            "Image\\Rubbishs\\Metals\\Walkie_talkie_1.png"];

var RubbishPlasticImgUrls = [ "Image\\Rubbishs\\Plastics\\Bag_1.png",
                            "Image\\Rubbishs\\Plastics\\Bottle_1.png",
                            "Image\\Rubbishs\\Plastics\\Bottle_2.png",
                            "Image\\Rubbishs\\Plastics\\Bottle_3.png",
                            "Image\\Rubbishs\\Plastics\\Bottle_4.png",
                            "Image\\Rubbishs\\Plastics\\Bottle_5.png",
                            "Image\\Rubbishs\\Plastics\\Bucket_1.png",
                            "Image\\Rubbishs\\Plastics\\Cup_1.png",
                            "Image\\Rubbishs\\Plastics\\Cup_2.png",
                            "Image\\Rubbishs\\Plastics\\Fork_1.png",
                            "Image\\Rubbishs\\Plastics\\Pot_1.png",
                            "Image\\Rubbishs\\Plastics\\Pot_2.png",
                            "Image\\Rubbishs\\Plastics\\Pot_3.png",
                            "Image\\Rubbishs\\Plastics\\Spoon_1.png",
                            "Image\\Rubbishs\\Plastics\\Straw_1.png",
                            "Image\\Rubbishs\\Plastics\\Toothbrush_1.png"];


var Rubbishs = [];

class Rubbish extends ImgComponent{
    constructor(width, height, x, y, speedX, speedY, img, Maxlife) {
        super(x, y, speedX, speedY, img);
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