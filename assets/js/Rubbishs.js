var RubbishMetalImgUrls = [ "..\\..\\assets\\img\\Rubbishs\\Metals\\Can_1.png",
                            "..\\..\\assets\\img\\Rubbishs\\Metals\\Can_2.png",
                            "..\\..\\assets\\img\\Rubbishs\\Metals\\Clock_1.png",
                            "..\\..\\assets\\img\\Rubbishs\\Metals\\Coffee_machine_1.png",
                            "..\\..\\assets\\img\\Rubbishs\\Metals\\Egg_whisk_1.png",
                            "..\\..\\assets\\img\\Rubbishs\\Metals\\Gramophone_1.png",
                            "..\\..\\assets\\img\\Rubbishs\\Metals\\Iron_1.png",
                            "..\\..\\assets\\img\\Rubbishs\\Metals\\Landline_1.png",
                            "..\\..\\assets\\img\\Rubbishs\\Metals\\Oven_1.png",
                            "..\\..\\assets\\img\\Rubbishs\\Metals\\Razor_1.png",
                            "..\\..\\assets\\img\\Rubbishs\\Metals\\Scale_1.png",
                            "..\\..\\assets\\img\\Rubbishs\\Metals\\Speaker_1.png",
                            "..\\..\\assets\\img\\Rubbishs\\Metals\\Speaker_2.png",
                            "..\\..\\assets\\img\\Rubbishs\\Metals\\Television_1.png",
                            "..\\..\\assets\\img\\Rubbishs\\Metals\\Television_2.png",
                            "..\\..\\assets\\img\\Rubbishs\\Metals\\Toaster_1.png",
                            "..\\..\\assets\\img\\Rubbishs\\Metals\\Typewriter_1.png",
                            "..\\..\\assets\\img\\Rubbishs\\Metals\\Walkie_talkie_1.png"];

var RubbishPlasticImgUrls = [ "..\\..\\assets\\img\\Rubbishs\\Plastics\\Bag_1.png",
                            "..\\..\\assets\\img\\Rubbishs\\Plastics\\Bottle_1.png",
                            "..\\..\\assets\\img\\Rubbishs\\Plastics\\Bottle_2.png",
                            "..\\..\\assets\\img\\Rubbishs\\Plastics\\Bottle_3.png",
                            "..\\..\\assets\\img\\Rubbishs\\Plastics\\Bottle_4.png",
                            "..\\..\\assets\\img\\Rubbishs\\Plastics\\Bottle_5.png",
                            "..\\..\\assets\\img\\Rubbishs\\Plastics\\Bucket_1.png",
                            "..\\..\\assets\\img\\Rubbishs\\Plastics\\Cup_1.png",
                            "..\\..\\assets\\img\\Rubbishs\\Plastics\\Cup_2.png",
                            "..\\..\\assets\\img\\Rubbishs\\Plastics\\Fork_1.png",
                            "..\\..\\assets\\img\\Rubbishs\\Plastics\\Pot_1.png",
                            "..\\..\\assets\\img\\Rubbishs\\Plastics\\Pot_2.png",
                            "..\\..\\assets\\img\\Rubbishs\\Plastics\\Pot_3.png",
                            "..\\..\\assets\\img\\Rubbishs\\Plastics\\Spoon_1.png",
                            "..\\..\\assets\\img\\Rubbishs\\Plastics\\Straw_1.png",
                            "..\\..\\assets\\img\\Rubbishs\\Plastics\\Toothbrush_1.png"];


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