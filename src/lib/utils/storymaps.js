import yaml from 'yaml'; // Import YAML parser
import fableFourAct from "/src/assets/maps/fableFourAct.yaml?raw";
import { convertTextToHtmlCardsOnly } from "/src/components/Script/Editor/code/parseScript.js";


const maps = {
    fableFourAct,
    // Add more maps here
};

export const storymaps = {
    get: {
        yaml: function (mapTitle) {
            return maps[mapTitle];
        },
        json: function (mapTitle) {
            return yaml.parse(maps[mapTitle]);
        },
        html: function (mapTitle) {
            const yaml = maps[mapTitle];
            const text = yamlToText(yaml); // Convert YAML to text first
            return convertTextToHtmlCardsOnly(text, true); // Then convert text to HTML
        },
        text: function (mapTitle) {
            const yaml = maps[mapTitle];
            return yamlToText(yaml);
        }
    }
};



function yamlToText(yamlText) {
    const arr = yaml.parse(yamlText)
    let out = ""
    arr.cards.forEach(element => {



        if (element.type === "section") {
            let section = element.title;
            section += "\n\n= " + element.description + "\n\n";
            out += section
        }


        if (element.type === "beat") {
            let beat = '. [[' + element.title + ']]\n\n';
            beat += "[[" + element.description + "]]\n\n";
            out += beat
        }



        if (element.type === "emptyCards") {
            let emptyCards = '. \n\n';
            for (let i = 0; i < element.count; i++) {
                out += emptyCards;
            }
        }



    });

    return out


}


window.storymaps = storymaps;