import yaml from 'yaml'; // Import YAML parser
import { convertTextToHtmlCardsOnly } from "/src/components/Script/Editor/code/parseScript.js";


async function fetchMap(filename) {
    const response = await fetch(`https://api-dev.hellofable.com/api/maps?filename=${filename}`);
    if (!response.ok) {
        console.error("Error fetching map:", response.statusText);
        return;
    }
    const mapData = await response.text();
    return mapData;
}




export const storymaps = {
    get: {
        yaml: async function (mapTitle) {
            const map = await fetchMap(mapTitle);
            return map
        },
        json: async function (mapTitle) {
            const map = await fetchMap(mapTitle);
            return yaml.parse(map);
        },
        html: async function (mapTitle) {
            const yaml = await fetchMap(mapTitle);
            const text = yamlToText(yaml); // Convert YAML to text first
            return convertTextToHtmlCardsOnly(text, true);
        },
        text: async function (mapTitle) {
            const yaml = await fetchMap(mapTitle);
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



        if (element.emptyCardsAfter) {
            let emptyCards = '. \n\n';
            for (let i = 0; i < element.emptyCardsAfter; i++) {
                out += emptyCards;
            }
        }



    });

    return out


}


window.storymaps = storymaps;